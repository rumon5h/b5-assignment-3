import express, { Request, Response } from 'express';
import BorrowModel from '../models/borrow.model';
import  BookModel  from '../models/books.model';


export const borrowRouter = express.Router();

// Borrow a book

borrowRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { book, quantity, dueDate } = req.body;

        const borrowBookIfAvailable = await BookModel.updateBorrowedCopies(book, quantity);

        if (!borrowBookIfAvailable) {
            res.status(400).json({
                success: false,
                message: 'Insufficient copies available or book not found',
            });
            return;
        }

        const borrow = await BorrowModel.create({
            book,
            quantity,
            dueDate,
        });

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to borrow book',
            error: error instanceof Error ? error.message : String(error),
        });
    }
});