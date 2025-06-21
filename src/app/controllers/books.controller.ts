import express,{ Request, Response } from 'express';
import BookModel from '../models/books.model';


export const booksRouter = express.Router();

// Create a new book
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

// Get all books
booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await BookModel.find();
        res.status(200).json({
            success: true,
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error: error,
        });
    }
}
);

// Get a book by ID
booksRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await BookModel.findById(bookId);
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch book',
            error: error,
        });
    }
});

// Update a book by ID
booksRouter.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, updatedData, { new: true });
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
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error: error,
        });
    }
});

