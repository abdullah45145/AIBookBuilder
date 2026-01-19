import { Schema, model } from 'mongoose';
// import { content } from 'pdfkit/js/page';

const chapterSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const bookSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: "",
    },
    author: {
        type: String,
        default: "",
    },
    coverImage : {
        type: String,
        default : "",
    },
    chapters: [chapterSchema],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
}, { timestamps: true });

export default model('Book', bookSchema);
