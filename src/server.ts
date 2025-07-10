import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import cors from "cors";
import express from "express"


let server: Server;

const PORT = config.port || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://l2-b5-a4.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


app.use(express.json());

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        console.log("Connected to Database");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()