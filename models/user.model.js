import mongoose from 'mongoose';
import roles from '../utils/roles'
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 6},
    name: {type: String, required: true},
    birthDate: {type: Date},
    avatar: {type: String},
    role: {type: Number, default: roles.dealer},
    dealerships: [{ type: Schema.Types.ObjectId, ref: 'Dealership' }]
}, {
    timestamps: true
});

User.pre('save', function(next) {

    return bcrypt.hash(this.password, saltRounds)
        .then(hash => {
            this.password = hash;

            next();
        })
        .catch(err => {
            console.log(err);

            throw new Error(err);
        });

});

User.methods.validatePassword = function(password){

    const user = this;

    return new Promise((resolve, reject) => {

        bcrypt.compare(password, user.password, (err, isValid) => {

            if (err) {
                return reject(err);
            } else if(!isValid){
                return reject(new Error('Incorrect password'));
            }else{
                return resolve(user);
            }

        });

    });

};

export default mongoose.model('User', User);