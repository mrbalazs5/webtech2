import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.json({test: 'test'});
});

app.get('/test2', (req, res) => {
    res.json({test2: 'test2'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));