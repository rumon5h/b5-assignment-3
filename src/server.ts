import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';


let server: Server;

const PORT = config.port || 3000;

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