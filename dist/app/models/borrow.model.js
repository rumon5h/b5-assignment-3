"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const borrowSchema = new mongoose_1.default.Schema({
    book: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Book', required: [true, 'Book is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] },
    dueDate: { type: Date, required: [true, 'Due date is required'] },
}, {
    timestamps: true,
    versionKey: false,
});
const BorrowModel = mongoose_1.default.model('Borrow', borrowSchema);
exports.default = BorrowModel;
