import dotenv from "dotenv";
dotenv.config();  // ← must come first

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

console.log("API key loaded?", !!process.env.GEMINI_API_KEY); // should print: true


export const generateOutline = async (req, res) => {
  try {
    const { topic, title, topicStyle, numChapter, description } = req.body;
    const bookTopic = topic || title;

    if (!bookTopic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const style = topicStyle || "informative";

    const prompt = `Create an outline for a book on "${bookTopic}" in ${style} style.
The book should have ${numChapter || 5} chapters.
Description: ${description || "No description provided."}
Return only a JSON array of chapter titles, e.g. ["Chapter 1: ..."]`;

    // Correct method call
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      return res
        .status(500)
        .json({ error: "Could not extract list from AI response.", aiResponse: text });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    let outline;
    try {
      outline = JSON.parse(jsonString);
    } catch {
      return res
        .status(500)
        .json({ error: "Invalid JSON from AI response.", aiResponse: text });
    }

    res.status(200).json({ outline });
  } catch (error) {
    console.error("Error generating outline:", error);
    res.status(500).json({ error: "Failed to generate outline" });
  }
};


// Generate chapter content
export const generateChapterContent = async (req, res) => {
  try {
    const { chapterTitle, topic, topicStyle } = req.body;

    if (!chapterTitle || !topic) {
      return res.status(400).json({ error: "chapterTitle and topic are required" });
    }

    const style = topicStyle || "informative and engaging";

    const prompt = `Write a detailed chapter for a book on "${topic}".
Chapter title: "${chapterTitle}".
Style: ${style}.`;

    // ✅ Use generateContent, not generateText
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      temperature: 0.7,
      maxOutputTokens: 1000
    });

    res.status(200).json({ content: response.text });
  } catch (error) {
    console.error("Error generating chapter content:", error);
    res.status(500).json({ error: "Failed to generate chapter content" });
  }
};

