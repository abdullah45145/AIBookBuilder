import express from "express";
import {
  exportBookAsDocx,
  exportBookAsPDF,
} from "../Controller/ExportController.js";

const router = express.Router();

// Export book as DOCX
router.get("/book/:id/docx", exportBookAsDocx);

// Export book as PDF
router.get("/book/:id/pdf", exportBookAsPDF);

export default router;
