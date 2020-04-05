import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json';
import mongoose from 'mongoose';
import UserController from './controllers/UserController';
import VehicleController from './controllers/VehicleController';
import authenticateUser from './middlewares/authenticateUser';

const app = express();
const port = process.env.PORT || 5000;

//config parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        console.log(err);
    });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//server routes
app.post('/api/sign-up', UserController.signUp.controller);

app.post('/api/sign-in', UserController.signIn.controller);

app.post('/api/create-make', VehicleController.createMake.controller);

app.get('/api/get-makes', VehicleController.getMakes.controller);

app.post('/api/create-model', VehicleController.createModel.controller);

app.get('/api/get-models', VehicleController.getModels.controller);

app.get('/api/get-vehicles', VehicleController.getVehicles.controller);

app.post('/api/check-token', authenticateUser, (req, res) => {
    res.status(200).json(req.user);
});

app.listen(port, () => console.log(`Listening on port ${port}`));