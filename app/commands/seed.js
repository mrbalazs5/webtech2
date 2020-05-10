import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

import CountrySeeder from '../../seeders/CountrySeeder';
import CitySeeder from '../../seeders/CitySeeder';
import UserSeeder from '../../seeders/UserSeeder';
import ModelSeeder from '../../seeders/ModelSeeder';

const seederList = [
    new CountrySeeder,
    new CitySeeder,
    new UserSeeder,
    new ModelSeeder
];

let seederPromises = seederList.map((seeder) => {
    return seeder.run();
});

Promise.all(seederPromises)
    .then(() => {
        return db.close();
    })
    .then(() => {
        console.log('Done.')
    })
    .catch((err) => {
        console.log(err);
    });

