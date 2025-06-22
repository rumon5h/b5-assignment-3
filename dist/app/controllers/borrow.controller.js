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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const books_model_1 = __importDefault(require("../models/books.model"));
exports.borrowRouter = express_1.default.Router();
// Borrow a book
exports.borrowRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const borrowBookIfAvailable = yield books_model_1.default.updateBorrowedCopies(book, quantity);
        if (!borrowBookIfAvailable) {
            res.status(400).json({
                success: false,
                message: 'Insufficient copies available or book not found',
            });
            return;
        }
        const borrow = yield borrow_model_1.default.create({
            book,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to borrow book',
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
// Borrowed Books Summary (Using Aggregation)
exports.borrowRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooksSummary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            {
                $unwind: '$bookDetails',
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrowedBooksSummary,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary',
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
