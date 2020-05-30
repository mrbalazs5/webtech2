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
import SearchController from './controllers/SearchController';
import authenticateUser from './middlewares/authenticateUser';
import Message from "./utils/Message";

const app = express();
const port = process.env.PORT || 5000;

//config parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .catch((err) => {
        console.log(err);
    });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//server routes/api/check-token
app.post('/api/sign-up', UserController.signUp.controller);

app.post('/api/sign-in', UserController.signIn.controller);

app.delete('/api/delete-user/:id', UserController.deleteUser.controller);

app.post('/api/create-make', VehicleController.createMake.controller);

app.get('/api/get-makes', VehicleController.getMakes.controller);

app.delete('/api/delete-make/:id', VehicleController.deleteMake.controller);

app.post('/api/create-model', VehicleController.createModel.controller);

app.get('/api/get-models', VehicleController.getModels.controller);

app.delete('/api/delete-model/:id', VehicleController.deleteModel.controller);

app.post('/api/create-dealership', VehicleController.createDealership.controller);

app.get('/api/get-dealerships', VehicleController.getDealerships.controller);

app.post('/api/create-vehicle', VehicleController.createVehicle.controller);

app.get('/api/get-vehicles', VehicleController.getVehicles.controller);

app.get('/api/get-cities', SearchController.getCities.controller);

app.get('/api/get-countries', SearchController.getCountries.controller);

app.get('/api/get-generations', SearchController.getGenerations.controller);

app.get('/api/get-series', SearchController.getSeries.controller);

app.get('/api/check-token', authenticateUser('dealer'), (req, res) => {
    res.status(200).json({user: req.user});
});

app.post('/api/log-out', (req, res) => {
    return res.clearCookie('authToken').status(200).json(new Message(['You have successfully logged out']).success());
});

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;