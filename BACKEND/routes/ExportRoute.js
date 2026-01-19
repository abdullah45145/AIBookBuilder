import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddlewares.js";
import {
  exportBookAsDocx,
  exportBookAsPDF,
} from "../Controller/ExportController.js";

const router = express.Router();

// Protect all export routes
router.use(AuthMiddleware);

// Export book as DOCX
router.get("/book/:id/docx", exportBookAsDocx);

// Export book as PDF
router.get("/book/:id/pdf", exportBookAsPDF);

export default router;
