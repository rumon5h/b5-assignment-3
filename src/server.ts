import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

const PORT = 3000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://assignment_3:wxjoy4fn9Cb0MUys@cluster0.trt1vv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to Database");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()