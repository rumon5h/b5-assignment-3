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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
        required: [true, 'Copies are required']
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// pre save hook to ensure copies are not negative
bookSchema.pre('save', function (next) {
    if (this.copies < 0) {
        const error = new Error('Copies cannot be negative');
        next(error);
        return;
    }
    next();
});
// post save hook to set available status based on copies
bookSchema.post('save', function (doc, next) {
    if (doc.copies > 0) {
        doc.available = true;
    }
    else {
        doc.available = false;
    }
    next();
});
// static method to handle borrow update
bookSchema.statics.updateBorrowedCopies = function (book, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const findBook = yield this.findById(book);
        if (!findBook) {
            throw new Error('Book not found');
        }
        if (findBook.copies < quantity) {
            throw new Error('Insufficient copies available');
        }
        if (findBook.copies === 0) {
            findBook.available = false;
            yield findBook.save();
            return;
        }
        findBook.copies -= quantity;
        if (findBook.copies === 0) {
            findBook.available = false;
            yield findBook.save();
            return findBook;
        }
        else {
            findBook.available = true;
            yield findBook.save();
            return findBook;
        }
    });
};
const BookModel = (0, mongoose_1.model)('Book', bookSchema);
exports.default = BookModel;
