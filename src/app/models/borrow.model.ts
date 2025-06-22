import mongoose from 'mongoose';
import { Borrow } from '../interfaces/borrow.interface';



const borrowSchema = new mongoose.Schema<Borrow>({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: [true, 'Book is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] },
    dueDate: { type: Date, required: [true, 'Due date is required'] },
}, {
    timestamps: true,
    versionKey: false,
});

const BorrowModel = mongoose.model<Borrow>('Borrow', borrowSchema);

export default BorrowModel;