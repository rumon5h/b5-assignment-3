import {Types,Document} from 'mongoose';

export interface Borrow extends Document {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}