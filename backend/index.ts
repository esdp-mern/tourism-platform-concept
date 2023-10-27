import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('*', (_, res) => res.sendStatus(404));


const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);

    app.listen(port, () => console.log(`Server started on ${port} port...`));

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch((e) => console.error(e));