import Book from "../models/Book.js";

/* ================= CREATE BOOK ================= */
export const createBook = async (req, res) => {
  try {
    const { title, subtitle, author, chapters } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const parsedChapters =
      typeof chapters === "string" ? JSON.parse(chapters) : chapters;

    const book = await Book.create({
      userId: req.user._id,
      title,
      subtitle,
      author,
      chapters: parsedChapters || [],
    });

    res.status(201).json({ bookId: book._id, ...book.toObject() });
  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL BOOKS ================= */
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id });
    res.json(books);
  } catch (error) {
    console.error("GET BOOKS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET BOOK BY ID ================= */
// Get book by ID
export const getBookbyid = async (req, res) => {
  try {
    const id = req.params.id.trim(); // REMOVE spaces/newlines
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(book);
  } catch (error) {
    console.error("GET BOOK BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE BOOK ================= */
export const updateBook = async (req, res) => {
  try {
    const { title, subtitle, author, chapters, status } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    book.title = title ?? book.title;
    book.subtitle = subtitle ?? book.subtitle;
    book.author = author ?? book.author;
    book.chapters =
      typeof chapters === "string" ? JSON.parse(chapters) : book.chapters;
    book.status = status ?? book.status;

    res.json(await book.save());
  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE BOOK ================= */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("DELETE BOOK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE BOOK COVER ================= */
export const updateBookcover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    book.coverImage = `/uploads/${req.file.filename}`;
    await book.save();

    res.json({
      message: "Cover image updated",
      coverImage: book.coverImage,
    });
  } catch (error) {
    console.error("UPDATE BOOK COVER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
