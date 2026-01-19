import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import MarkdownIt from "markdown-it";
import book from "../models/Book.js";

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";





const md = new MarkdownIt();

export const exportBookAsDocx = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = await book.findById(bookId);

    if (!bookData) {
      return res.status(404).json({ message: "Book not found" });
    }

    const children = [];

    // Title Page
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: bookData.title,
            bold: true,
            size: 64,
            font: "Times New Roman",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `by ${bookData.author}`,
            size: 40,
          }),
        ],
        spacing: { before: 300 },
      })
    );

    // Chapters
    bookData.chapters.forEach((chapter, index) => {
      children.push(
        new Paragraph({
          text: `Chapter ${index + 1}: ${chapter.title}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      const textContent = md.render(chapter.content).replace(/<[^>]+>/g, "");
      const paragraphs = textContent.split("\n").filter(p => p.trim());

      paragraphs.forEach(p => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: p,
                size: 24,
                font: "Times New Roman",
              }),
            ],
            spacing: { after: 200 },
          })
        );
      });
    });

    const doc = new Document({
      sections: [{ children }],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${bookData.title}.docx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (error) {
    console.error("DOCX Export Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const exportBookAsPDF = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = await book.findById(bookId);

    if (!bookData) {
      return res.status(404).json({ message: "Book not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${bookData.title}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Title Page
    doc
      .font("Times-Bold")
      .fontSize(28)
      .text(bookData.title, { align: "center" })
      .moveDown(1.5);

    doc
      .font("Times-Roman")
      .fontSize(18)
      .text(`by ${bookData.author}`, { align: "center" });

    doc.addPage();

    // Chapters
    bookData.chapters.forEach((chapter, index) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .text(`Chapter ${index + 1}: ${chapter.title}`, {
          underline: true,
        })
        .moveDown();

      const textContent = md.render(chapter.content).replace(/<[^>]+>/g, "");
      const paragraphs = textContent.split("\n").filter(p => p.trim());

      paragraphs.forEach(p => {
        doc
          .font("Times-Roman")
          .fontSize(12)
          .text(p, { align: "justify" })
          .moveDown(0.5);
      });

      doc.addPage();
    });

    doc.end();
  } catch (error) {
    console.error("PDF Export Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
