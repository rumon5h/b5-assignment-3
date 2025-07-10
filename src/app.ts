import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';
import cors from 'cors';
import { borrowRouter } from './app/controllers/borrow.controller';



const app: Application = express();


const corsOptions ={
   origin:'*', 
   credentials:true,    
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 


app.use(express.json());


app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter);



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the  Library Management Software!');
});


export default app;