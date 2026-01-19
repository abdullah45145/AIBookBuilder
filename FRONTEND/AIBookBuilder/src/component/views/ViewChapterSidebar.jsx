import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaGripVertical } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { apiPath } from "../../utils/apiPath";

const ViewChapterSidebar = ({ activeChapterId, onSelectChapter }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOK ================= */
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(
          apiPath.BOOK.GET_BOOK_BY_ID(bookId)
        );
        setBook(res.data);
      } catch (error) {
        console.error("FETCH BOOK ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <aside className="w-80 border-r px-6 py-4 text-gray-400">
        Loading chapters...
      </aside>
    );
  }

  if (!book) {
    return (
      <aside className="w-80 border-r px-6 py-4 text-red-500">
        Book not found
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r bg-white flex flex-col h-full">
      {/* HEADER */}
      <div className="px-6 py-4 border-b">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-3"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <h2 className="font-bold text-lg text-gray-900">
          {book.title}
        </h2>
      </div>

      {/* CHAPTER LIST */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {book.chapters.map((chapter, index) => {
          const isActive = chapter._id === activeChapterId;

          return (
            <button
              key={chapter._id}
              onClick={() => onSelectChapter(chapter)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition
                ${
                  isActive
                    ? "bg-purple-50 border-purple-400 text-purple-700"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }
              `}
            >
              <FaGripVertical className="text-gray-400" />

              <span className="text-sm font-semibold">
                Chapter {index + 1}: {chapter.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold hover:bg-gray-50"
        >
          <FaPlus />
          New Chapter
        </button>
      </div>
    </aside>
  );
};

export default ViewChapterSidebar;
