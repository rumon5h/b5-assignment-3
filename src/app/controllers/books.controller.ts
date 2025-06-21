import express,{ Request, Response } from 'express';
import BookModel from '../models/books.model';


export const booksRouter = express.Router();


booksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        const newBook = await BookModel.create(bookData);


        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create book',
            error: error,
        });
    }
}
);

