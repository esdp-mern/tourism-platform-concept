import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('*', (_, res) => res.sendStatus(404));

app.listen(port, () => console.log(`Server started on ${port} port...`));
