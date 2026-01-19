import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddlewares.js";
import { generateOutline, generateChapterContent } from "../Controller/aiController.js";

const router = express.Router();

// All routes protected
router.use(AuthMiddleware);

// Generate book outline
router.post("/generate-outline", generateOutline);

// Generate chapter content
router.post("/generate-chapter", generateChapterContent);

export default router;
