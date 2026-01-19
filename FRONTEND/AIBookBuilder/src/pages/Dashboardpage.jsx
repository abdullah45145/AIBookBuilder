import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaSignOutAlt,
  FaChevronDown,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { apiPath } from "../utils/apiPath";
import CreateBookModel from "../component/modals/Createbookmodel";

const Dashboardpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= FETCH USER ================= */
  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get(apiPath.AUTH.GET_PROFILE);
      setUser(res.data.user || res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get(apiPath.BOOK.GET_BOOKS);
      setBooks(res.data.books || res.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  /* ================= DELETE BOOK ================= */
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(
        apiPath.BOOK.DELETE_BOOK(selectedBook._id)
      );
      setBooks((prev) =>
        prev.filter((b) => b._id !== selectedBook._id)
      );
      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchUserProfile();
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-xl shadow">
              <HiOutlineDocumentText className="text-white text-xl" />
            </div>
            <Link to="/">
              <span className="text-lg font-bold text-gray-900">
                AI eBook Creator
              </span>
            </Link>
          </div>

          {user && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-gray-50 border border-gray-100 hover:bg-gray-100 px-4 py-2 rounded-full transition"
              >
                <div className="text-right hidden sm:block">
                  <span className="block font-bold text-sm text-gray-900 leading-none">
                    {user.username || user.name}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {user.email}
                  </span>
                </div>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  {(user.username || user.name)
                    ?.charAt(0)
                    .toUpperCase()}
                </div>
                <FaChevronDown
                  className={`text-xs text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border z-20">
                    <div className="px-4 py-3 border-b">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Account
                      </p>
                      <p className="text-sm font-bold truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-red-500 flex items-center gap-2 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      <span className="font-semibold text-sm">
                        Logout
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              All eBooks
            </h2>
            <p className="text-gray-500 mt-1 font-medium">
              Create, edit, and manage your AI-generated books
            </p>
          </div>

          {/* CREATE BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all"
          >
            <FaPlus className="text-sm" />
            Create eBook
          </button>
        </div>

        {/* ================= BOOK GRID ================= */}
        {books.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="group bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <img
                    src={book.coverImage || "/default-book-cover.jpg"}
                    
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4">
                    <Link
                      to={`/books/edit/${book._id}`}
                      className="bg-white p-4 rounded-2xl text-purple-600 hover:scale-110 transition"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setShowDeleteModal(true);
                      }}
                      className="bg-white p-4 rounded-2xl text-red-500 hover:scale-110 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold truncate text-lg">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {book.author ||
                      user?.username ||
                      user?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="mt-4 border-2 border-dashed rounded-[2.5rem] py-24 flex flex-col items-center text-center bg-gray-50">
            <div className="w-16 h-16 bg-white rounded-2xl shadow flex items-center justify-center mb-6">
              <HiOutlineDocumentText className="text-gray-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              No eBooks Found
            </h3>
            <p className="text-gray-500 mb-8">
              Create your first AI-powered book
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold shadow hover:scale-105 transition"
            >
              <FaPlus />
              Create Your First eBook
            </button>
          </div>
        )}
      </main>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-3">
              Delete eBook
            </h3>
            <p className="text-gray-500 mb-8">
              Are you sure you want to delete{" "}
              <strong>{selectedBook?.title}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border px-5 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white px-5 py-3 rounded-xl font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE BOOK MODAL ================= */}
      <CreateBookModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchBooks}
      />
    </div>
  );
};

export default Dashboardpage;
