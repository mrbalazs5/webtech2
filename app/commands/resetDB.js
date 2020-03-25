import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import fs from 'fs';

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.dropDatabase()
    .then((result) => {
        if(result){
            db.close();
            return true
        }
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            fs.rmdir('./client/public/uploads', { recursive: true }, (err) => {

                if(err){
                    return reject(err);
                }else{
                    return resolve(true);
                }

            });
        })
    })
    .then(() => {
        console.log('Done');
    })
    .catch((err) => {
        console.log(err);
        db.close();
    });