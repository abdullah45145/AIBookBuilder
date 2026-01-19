import express from "express";
import {
  createBook,
  getBooks,
  getBookbyid,
  updateBook,
  deleteBook,
  updateBookcover,
} from "../Controller/BookController.js";
import AuthMiddleware from "../middlewares/AuthMiddlewares.js";
import upload from "../middlewares/UploadMiddlewares.js";

const router = express.Router();

// Protect all routes
router.use(AuthMiddleware);

// CRUD routes
router.route("/")
  .post(createBook)
  .get(getBooks);

router.route("/:id")
  .get(getBookbyid)
  .put(updateBook)
  .delete(deleteBook);

// Update cover route
router.route("/cover/:id")
  .put(upload.single('cover'), updateBookcover);

export default router;
