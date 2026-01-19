import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. Get the model - using gemini-2.0-flash which is the latest and most reliable
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Simple request queue to prevent rate limiting
let requestQueue = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const { fn, resolve, reject } = requestQueue.shift();

  try {
    const result = await fn();
    resolve(result);
  } catch (error) {
    reject(error);
  } finally {
    // Add delay between requests (1.5 seconds to respect API limits)
    setTimeout(() => {
      isProcessing = false;
      processQueue();
    }, 1500);
  }
};

const queueRequest = (fn) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fn, resolve, reject });
    processQueue();
  });
};

// Retry utility with exponential backoff (longer delays for rate limits)
const retryWithBackoff = async (fn, maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      // Check if it's a rate limit error (429)
      if (error.status === 429 && attempt < maxRetries - 1) {
        // Exponential backoff with longer delays: 3s, 6s, 12s, 24s, 48s
        const delay = Math.pow(2, attempt + 1) * 1500;
        console.log(
          `Rate limited. Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

export const generateOutline = async (req, res) => {
  try {
    const { topic, title, writingStyle, chaptersCount } = req.body;
    const bookTopic = topic || title;
    if (!bookTopic) return res.status(400).json({ error: "Topic is required" });

    const prompt = `Create a book outline for "${bookTopic}" in ${writingStyle || "informative"} style.
    Chapters: ${chaptersCount || 5}.
    Return ONLY a JSON array: [{"title": "Chapter 1: ...", "description": "..."}]`;

    // Use queued request with retry logic
    const result = await queueRequest(() =>
      retryWithBackoff(() => model.generateContent(prompt)),
    );
    const response = await result.response;
    const text = response.text();

    // 🔹 FIX: Strip markdown backticks that cause JSON.parse to fail (500 error)
    const cleanJson = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const chapters_data = JSON.parse(cleanJson);
    res.status(200).json({ chapters: chapters_data });
  } catch (error) {
    console.error("Outline Error:", error);
    // Handle 429 (Rate Limited), 503 (Overloaded), and 404 (Not Found)
    const status = error.status || 500;
    const message =
      error.status === 429
        ? "API rate limit exceeded. Please wait a moment and try again."
        : error.message;
    res.status(status).json({ error: message });
  }
};

export const generateChapterContent = async (req, res) => {
  try {
    const { chapterTitle, topic } = req.body;

    if (!chapterTitle || !topic) {
      return res.status(400).json({ error: "Missing title or topic" });
    }

    const prompt = `Write a comprehensive, high-quality chapter for a book about "${topic}".
    Chapter Title: "${chapterTitle}".
    Provide detailed information and engaging subheadings.`;

    // Use queued request with retry logic
    const result = await queueRequest(() =>
      retryWithBackoff(() => model.generateContent(prompt)),
    );
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ content: text });
  } catch (error) {
    console.error("Chapter Content Error:", error);

    // Check for regional restrictions
    if (error.message?.includes("location") || error.status === 403) {
      return res
        .status(403)
        .json({ error: "Gemini is not available in your region." });
    }

    const message =
      error.status === 429
        ? "API rate limit exceeded. Please wait a moment and try again."
        : "AI failed to generate content. Please check your API key.";
    res.status(error.status || 500).json({ error: message });
  }
};
