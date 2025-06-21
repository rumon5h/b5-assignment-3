import { Schema, model } from 'mongoose';
import { Book } from '../interfaces/books.interface';
const bookSchema = new Schema<Book>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [300, 'Title cannot exceed 300 characters'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [100, 'Author cannot exceed 100 characters'],
    },
    genre: {
        type: String,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: 'Genre must be one of the predefined values',
        },
        required: [true, 'Genre is required'],
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, 'Copies are required'],
        min: [0, 'Copies cannot be negative'],
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const BookModel = model<Book>('Book', bookSchema);

export default BookModel;
