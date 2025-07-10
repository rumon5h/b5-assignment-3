import express, { Request, Response } from 'express';
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
            error: (error as Error).message || 'An error occurred',
        });
    }
}
);

// Get all books by filtering and sorting
booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy, sort, limit } = req.query;

        let query: any = {};
        if (filter) {
            query.genre = filter;
        }

        let options: any = {};
        if (sortBy && sort) {
            options.sort = { [sortBy as string]: sort === 'desc' ? -1 : 1 };
        }
        if (limit) {
            options.limit = parseInt(limit as string);
        }

        const books = await BookModel.find(query, null, options);

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
        const copies = req?.body?.copies;

        if (copies == 0) {
            const updatedBook = await BookModel.findByIdAndUpdate(bookId, { ...updatedData, available: false, }, { new: true });
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
        } else if (copies > 0) {
            const updatedBook = await BookModel.findByIdAndUpdate(bookId, { ...updatedData, available: true, }, { new: true });
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

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error: error,
        });
    }
});


// Delete a book by ID
booksRouter.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const deletedBook = await BookModel.findByIdAndDelete(bookId);
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: error,
        });
    }
});
