"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = __importDefault(require("../models/books.model"));
exports.booksRouter = express_1.default.Router();
// Create a new book
exports.booksRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const newBook = yield books_model_1.default.create(bookData);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create book',
            error: error.message || 'An error occurred',
        });
    }
}));
// Get all books by filtering and sorting
exports.booksRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        let query = {};
        if (filter) {
            query.genre = filter;
        }
        let options = {};
        if (sortBy && sort) {
            options.sort = { [sortBy]: sort === 'desc' ? -1 : 1 };
        }
        if (limit) {
            options.limit = parseInt(limit);
        }
        const books = yield books_model_1.default.find(query, null, options);
        if (books.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No books found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error: error,
        });
    }
}));
// Get a book by ID
exports.booksRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch book',
            error: error,
        });
    }
}));
// Update a book by ID
exports.booksRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        const updatedBook = yield books_model_1.default.findByIdAndUpdate(bookId, updatedData, { new: true });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error: error,
        });
    }
}));
// Delete a book by ID
exports.booksRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield books_model_1.default.findByIdAndDelete(bookId);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: error,
        });
    }
}));
