import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
import cors from "cors";

const app: Application = express();


// ✅ Manual CORS middleware
app.use((req: Request, res: Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://l2-b5-a4.vercel.app'); // or your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());


app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter);



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the  Library Management Software!');
});


export default app;