import User from '../models/user.model';
import Message from '../utils/Message';
import uploadsPath from '../utils/uploadsPath';
import FileHandler from '../utils/FileHandler';
import {trim, escape, isEmail, normalizeEmail, isLength} from 'validator';
import {isEmpty} from '../utils/customValidator';
import jwt from 'jsonwebtoken';

//Handles user requests
const UserController = {

    //registers a new User in the database
    signUp: {
        controller: (req, res) => {

            const fileHandler = new FileHandler(req, res, uploadsPath('image'));

            fileHandler.uploadSingle({type: 'image'})
                //validate user data after file upload
                .then((file) => {

                    const body = req.body;

                    if(
                        isEmpty(body.email) || !isEmail(body.email) ||
                        isEmpty(body.password) || !isLength(body.password, {min:6, max: undefined}) ||
                        isEmpty(body.name)
                    ){
                        fileHandler.revokeFileUpload(file);
                        throw new Error('Field constraint violation');
                    }

                    return User.find({email: body.email})
                        .then((usersDB) => {
                            if(usersDB.length > 0){
                                fileHandler.revokeFileUpload(file);
                                throw new Error('User already exists in the database');
                            }

                            normalizeEmail(body.email);
                            trim(body.name);

                            body.file = file;

                            return body;
                        });
                })
                //persist user data
                .then((body) => {

                    const {email, password, name, birthDate, file} = body;

                    let user = new User({
                        email: email,
                        password: password,
                        name: name,
                        birthDate: birthDate,
                        avatar: file.path
                    });

                    return user.save()
                })
                .then(() => {
                    return res.status(200).json(new Message(['User successfully created']).success());
                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });

        }
    },

    //login for users
    signIn: {
        controller: (req, res) => {

            const {email, password} = req.body;

            console.log(req.body);

            new Promise((resolve, reject) => {
                if(
                    isEmpty(email) || !isEmail(email) ||
                    isEmpty(password) || !isLength(password, {min:6, max: undefined})
                ){
                    reject(new Error('Field constraint violation'));
                }else{
                    resolve(true);
                }
            })
                .then(() => {
                    return User.findOne({email: email});
                })
                .then((user) => {

                    if(user){
                        return user;
                    }else{
                        throw new Error('Invalid email address');
                    }

                })
                .then((user) =>{

                    return user.validatePassword(password);
                })
                .then((user) =>{
                    console.log(user);
                    const role = user.role;
                    const avatar = user.avatar;
                    const payload = { email, avatar, role};
                    const token = jwt.sign(payload, process.env.JWT_SECRET);

                    return res.cookie('authToken', token, { httpOnly: true, maxAge: 900000})
                        .status(200)
                        .json(new Message(['You have successfully signed in']).success());
                })
                .catch((err) => {
                    console.log(err);

                    return res.json(new Message([err.toString()]).error());
                });

        }
    }

};

export default UserController;