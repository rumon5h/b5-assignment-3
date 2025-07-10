import { Schema, model } from 'mongoose';
import { Book,BookModel } from '../interfaces/books.interface';

const bookSchema = new Schema<Book>({
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
},{
    timestamps: true,
    versionKey: false,
});




// pre save hook to ensure copies are not negative
bookSchema.pre<Book>('save', function (next) {
    if (this.copies < 0) {
        const error = new Error('Copies cannot be negative');
        return next(error);
    }    
    next();
});

// post save hook to set available status based on copies
bookSchema.post<Book>('save', function (doc, next) {
    if (doc.copies > 0) {
        doc.available = true;
        doc.save()
    } else if(doc.copies == 0) {
        doc.available = false;
        doc.save()
    }else if(doc.copies < 0){
        next(new Error('Copies cannot be negative'))
        return 
    }
    next();
    
});
    



// static method to handle borrow update
bookSchema.statics.updateBorrowedCopies = async function (book: string, quantity: number): Promise<void> {
    const findBook = await this.findById(book);
    if (!findBook) {
        throw new Error('Book not found');
    }
    if (findBook.copies < quantity) {
        throw new Error('Insufficient copies available');
    }

    if (findBook.copies === 0) {
        findBook.available = false;
        await findBook.save();
        return;
    }
    findBook.copies -= quantity;

    if (findBook.copies === 0) {
        findBook.available = false;
        await findBook.save();
        return findBook;
    } else {
        findBook.available = true;
        await findBook.save();
        return findBook;
    }
    
};

const BookModel = model<Book, BookModel>('Book', bookSchema);

export default BookModel;
