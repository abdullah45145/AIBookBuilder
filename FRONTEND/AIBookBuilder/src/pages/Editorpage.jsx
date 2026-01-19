import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaDownload, FaWandMagicSparkles } from "react-icons/fa6";
import ViewChapterSidebar from "../component/views/ViewChapterSidebar";
import axiosInstance from "../utils/axiosinstance";
import { apiPath } from "../utils/apiPath";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const EditorPage = () => {
  const { bookId } = useParams();
  const [activeChapter, setActiveChapter] = useState(null);
  const [editMode, setEditMode] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [book, setBook] = useState(null);

  // Fetch book on mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(
          apiPath.BOOK.GET_BOOK_BY_ID(bookId),
        );
        setBook(res.data);
        if (res.data.chapters.length > 0) {
          setActiveChapter(res.data.chapters[0]);
        }
      } catch (error) {
        console.error("FETCH BOOK ERROR:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  // Handle chapter selection
  const handleSelectChapter = (chapter) => {
    setActiveChapter(chapter);
  };

  // Handle chapter content update
  const handleContentChange = (newContent) => {
    setActiveChapter({ ...activeChapter, content: newContent });
  };

  // Handle chapter title update
  const handleTitleChange = (newTitle) => {
    setActiveChapter({ ...activeChapter, title: newTitle });
  };

  // Save chapter
  const handleSaveChanges = async () => {
    if (!activeChapter || !book) return;

    setSaving(true);
    try {
      // Update chapter in book
      const updatedChapters = book.chapters.map((ch) =>
        ch._id === activeChapter._id ? activeChapter : ch,
      );

      const res = await axiosInstance.put(apiPath.BOOK.UPDATE_BOOK(bookId), {
        chapters: updatedChapters,
      });

      setBook(res.data);
      alert("Chapter saved successfully!");
    } catch (error) {
      console.error("SAVE CHAPTER ERROR:", error);
      alert("Failed to save chapter");
    } finally {
      setSaving(false);
    }
  };

  // Generate chapter content with AI
  const handleGenerateWithAI = async () => {
    if (!activeChapter) return;

    setGeneratingAI(true);
    try {
      const res = await axiosInstance.post(
        apiPath.AI.GENERATE_CHAPTER_CONTENT,
        {
          chapterTitle: activeChapter.title,
          topic: book?.topic || "General",
          topicStyle: book?.writingStyle || "informative",
        },
      );

      if (res.data?.content) {
        handleContentChange(res.data.content);
      }
    } catch (error) {
      console.error("GENERATE AI ERROR:", error);
      alert("Failed to generate content with AI");
    } finally {
      setGeneratingAI(false);
    }
  };

  // Export as PDF
  const handleExportPDF = async () => {
    try {
      const res = await axiosInstance.get(apiPath.EXPORT.PDF(bookId), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book?.title || "book"}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("EXPORT PDF ERROR:", error);
      alert("Failed to export PDF");
    }
  };

  // Export as DOCX
  const handleExportDocx = async () => {
    try {
      const res = await axiosInstance.get(apiPath.EXPORT.DOCX(bookId), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book?.title || "book"}.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("EXPORT DOCX ERROR:", error);
      alert("Failed to export DOCX");
    }
  };

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading book...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* SIDEBAR */}
      <ViewChapterSidebar
        activeChapterId={activeChapter?._id}
        onSelectChapter={handleSelectChapter}
      />

      {/* MAIN EDITOR */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <div className="border-b px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm text-gray-500">Chapter Editor</h1>
            <p className="text-base font-semibold text-gray-900">
              Editing: {activeChapter?.title || "No chapter selected"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab Buttons */}
            <div className="flex gap-2 mr-4">
              <button
                onClick={() => setEditMode("edit")}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  editMode === "edit"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setEditMode("preview")}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  editMode === "preview"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Export Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-50 transition">
                <FaDownload size={14} />
                Export
              </button>
              <div className="absolute right-0 mt-1 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <button
                  onClick={handleExportPDF}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                <button
                  onClick={handleExportDocx}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                >
                  Export as DOCX
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveChanges}
              disabled={saving}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-400 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* EDITOR CONTENT */}
        <div className="flex-1 overflow-hidden flex">
          {activeChapter ? (
            <>
              {/* LEFT PANEL - EDITOR */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Chapter Title */}
                <div className="px-8 py-4 border-b">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    value={activeChapter.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Markdown Editor */}
                <div className="flex-1 flex flex-col overflow-hidden px-8 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Markdown Editor
                    </label>
                    <button
                      onClick={handleGenerateWithAI}
                      disabled={generatingAI}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-400 transition"
                    >
                      <FaWandMagicSparkles size={16} />
                      {generatingAI ? "Generating..." : "Generate with AI"}
                    </button>
                  </div>

                  <textarea
                    value={activeChapter.content || ""}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Write your chapter content in Markdown..."
                    className="flex-1 w-full p-4 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </div>

              {/* RIGHT PANEL - PREVIEW */}
              {editMode === "preview" && (
                <div className="w-1/2 border-l overflow-y-auto px-8 py-4">
                  <div className="prose prose-sm max-w-none">
                    <h2 className="text-2xl font-bold mb-4">
                      {activeChapter.title}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: md.render(activeChapter.content || ""),
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a chapter to start editing</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditorPage;
