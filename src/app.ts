import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
import cors from "cors";

const app: Application = express();


app.use(cors({
  origin: ['http://localhost:5173', 'https://l2-b5-a4.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());


app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter);



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the  Library Management Software!');
});


export default app;