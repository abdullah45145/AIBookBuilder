import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path, { join } from 'path';
import connectDB from './config/dbconfig.js';
import authRoutes from './routes/AuthRoute.js';
import bookRoutes from './routes/BookRoute.js';
import aiRoutes from './routes/aiRoute.js';
import exportRoutes from './routes/ExportRoute.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

// Serve static files from uploads folder
app.use("/backend/uploads", express.static(join(process.cwd(), "uploads")));

app.use('/api/auth', authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/export", exportRoutes);
// Sample route


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
