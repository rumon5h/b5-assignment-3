import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';


const app: Application = express();

app.use(express.json())


app.use('/api/books', booksRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the  Library Management Software!');
});


export default app;