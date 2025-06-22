import { Document,Model } from 'mongoose';
export interface Book extends Document {
    title: string;
    author: string;
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
    isbn: string;
    description: string;
    copies: number;
    available?: boolean;
}

export interface BookModel extends Model<Book> {
  updateBorrowedCopies(book: string, quantity: number): Promise<Book>;
}