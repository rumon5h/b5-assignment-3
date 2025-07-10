import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrow.controller';



const app: Application = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://l2-b5-a4.vercel.app"); // Update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());


app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter);



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the  Library Management Software!');
});


export default app;