import React, { useState } from "react";
import {
  FaTimes,
  FaBook,
  FaLightbulb,
  FaMagic,
  FaArrowLeft,
  FaPlus,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { apiPath } from "../../utils/apiPath";

const Createbookmodel = ({ isOpen, onClose, onRefresh }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    chaptersCount: 5,
    topic: "",
    writingStyle: "Informative",
  });

  const [chapters, setChapters] = useState([]);

  if (!isOpen) return null;

  /* ================= RETRY LOGIC ================= */
  const retryRequest = async (fn, maxRetries = 5) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        // Retry on 429 (Too Many Requests) or 503 (Service Unavailable)
        if (
          (error.response?.status === 429 || error.response?.status === 503) &&
          attempt < maxRetries - 1
        ) {
          // Longer delays for rate limiting: 3s, 6s, 12s, 24s, 48s
          const delay = Math.pow(2, attempt + 1) * 1500;
          console.log(
            `Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
  };

  /* ================= GENERATE OUTLINE ================= */
  const handleGenerateOutline = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);

    try {
      const res = await retryRequest(() =>
        axiosInstance.post(apiPath.AI.GENERATE_OUTLINE, {
          title: formData.title,
          chaptersCount: Number(formData.chaptersCount),
          topic: formData.topic,
          writingStyle: formData.writingStyle,
        }),
      );

      if (!res.data?.chapters?.length) {
        throw new Error("No chapters returned");
      }

      setChapters(res.data.chapters);
      setStep(2);
    } catch (error) {
      console.error("GENERATE OUTLINE ERROR:", error);

      // Show error message to user
      const errorMsg = error.response?.data?.error || error.message;
      if (errorMsg.includes("rate limit")) {
        alert("API rate limit exceeded. Please wait a moment and try again.");
      }

      // fallback chapters
      const fallback = Array.from(
        { length: Number(formData.chaptersCount) },
        (_, i) => ({
          title: `Chapter ${i + 1}`,
          description: "AI generated chapter outline",
        }),
      );

      setChapters(fallback);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD CHAPTER ================= */
  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        title: `Chapter ${prev.length + 1}`,
        description: "New chapter description",
      },
    ]);
  };

  /* ================= CREATE BOOK ================= */
  const handleCreateBook = async () => {
    if (!chapters.length) return;

    setLoading(true);

    try {
      const res = await axiosInstance.post(apiPath.BOOK.CREATE_BOOK, {
        title: formData.title,
        topic: formData.topic,
        writingStyle: formData.writingStyle,
        chapters,
      });

      const bookId = res.data.bookId;
      if (!bookId) throw new Error("Book ID missing");

      handleClose();
      onRefresh();

      // 🔥 redirect to editor page
      navigate(`/editor/${bookId}`);
    } catch (error) {
      console.error(
        "CREATE BOOK ERROR:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= CLOSE & RESET ================= */
  const handleClose = () => {
    setStep(1);
    setLoading(false);
    setFormData({
      title: "",
      chaptersCount: 5,
      topic: "",
      writingStyle: "Informative",
    });
    setChapters([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* HEADER */}
        <div className="px-8 py-6 flex justify-between items-center">
          <h3 className="text-xl font-bold">Create New eBook</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* PROGRESS */}
        <div className="px-8 pb-8 flex items-center gap-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? "bg-purple-100 text-purple-600" : "bg-gray-100"
            }`}
          >
            {step > 1 ? "✓" : "1"}
          </div>

          <div className="flex-1 h-1 bg-gray-100 relative">
            <div
              className={`absolute h-full bg-purple-600 transition-all ${
                step === 2 ? "w-full" : "w-0"
              }`}
            />
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step === 2 ? "bg-purple-100 text-purple-600" : "bg-gray-100"
            }`}
          >
            2
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form
            onSubmit={handleGenerateOutline}
            className="px-8 pb-8 space-y-5"
          >
            <div>
              <label className="block font-bold mb-2">Book Title</label>
              <div className="relative">
                <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  required
                  className="w-full bg-gray-50 border rounded-xl py-3 pl-11 pr-4"
                  placeholder="Enter your book title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Chapters</label>
              <input
                type="number"
                min={1}
                className="w-full bg-gray-50 border rounded-xl py-3 px-4"
                value={formData.chaptersCount}
                onChange={(e) =>
                  setFormData({ ...formData, chaptersCount: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Topic (Optional)</label>
              <div className="relative">
                <FaLightbulb className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  className="w-full bg-gray-50 border rounded-xl py-3 pl-11 pr-4"
                  placeholder="Specific topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Writing Style</label>
              <select
                className="w-full bg-gray-50 border rounded-xl py-3 px-4"
                value={formData.writingStyle}
                onChange={(e) =>
                  setFormData({ ...formData, writingStyle: e.target.value })
                }
              >
                <option>Informative</option>
                <option>Creative</option>
                <option>Professional</option>
              </select>
            </div>

            <button
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <FaMagic />
              {loading ? "Generating..." : "Generate Outline"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="px-8 pb-8">
            <h4 className="font-bold mb-4">Review Chapters</h4>

            <div className="max-h-60 overflow-y-auto space-y-2 mb-6">
              {chapters.map((ch, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg border">
                  <strong>
                    {idx + 1}. {ch.title}
                  </strong>
                  <p className="text-sm text-gray-500">{ch.description}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border font-bold flex items-center gap-2"
              >
                <FaArrowLeft /> Back
              </button>

              <button
                onClick={addChapter}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 font-bold"
              >
                <FaPlus /> Add Chapter
              </button>

              <button
                onClick={handleCreateBook}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white font-bold"
              >
                {loading ? "Creating..." : "Create eBook"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Createbookmodel;
