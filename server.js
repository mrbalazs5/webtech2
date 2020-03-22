import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
import mongoose from 'mongoose';
import UserController from './controllers/UserController';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//server routes
app.post('/api/sign-up', UserController.signUp.controller);

app.post('/api/sign-in', UserController.signIn.controller);

app.listen(port, () => console.log(`Listening on port ${port}`));