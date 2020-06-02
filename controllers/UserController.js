import User from '../models/user.model';
import Message from '../utils/Message';
import uploadsPath from '../utils/uploadsPath';
import FileHandler from '../utils/FileHandler';
import {trim, escape, isEmail, normalizeEmail, isLength} from 'validator';
import {isEmpty} from '../utils/customValidator';
import jwt from 'jsonwebtoken';
import Model from "../models/model.model";
import Make from "../models/make.model";
import Generation from "../models/generation.model";
import Series from "../models/series.model";

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
                        })
                        .catch(() => {
                            fileHandler.revokeFileUpload(file);
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
                    const id = user._id;
                    const role = user.role;
                    const avatar = user.avatar;
                    const name = user.name;
                    const birthDate = user.birthDate;
                    const payload = { id, email, avatar, name, birthDate, role};
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
    },
    getUsers: {
        controller: (req, res) => {

            User.find()
                .then((users) => {

                    if(users.length < 1){
                        throw new Error('There are no users in the database');
                    }

                    return res.status(200).json(users);

                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });

        }
    },
    deleteUser: {
        controller: (req, res) => {

            const { id } = req.params;

            User.deleteOne({_id: id})
                .then(() => {

                    return res.status(422).json(new Message(['User deleted']).success());
                });

        }
    }

};

export default UserController;