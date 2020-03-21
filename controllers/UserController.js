import User from '../models/user.model';
import Message from '../utils/Message';
import uploadsPath from '../utils/uploadsPath';
import FileUploader from '../utils/FileUploader';
import {trim, escape, isEmail, normalizeEmail, isLength} from 'validator';
import {isEmpty} from '../utils/customValidator';

//Handles user requests
const UserController = {

    signUp: {
        controller: (req, res) => {

            const fileUploader = new FileUploader(req, res, uploadsPath('image'));

            fileUploader.uploadSingle()
                .then((file) => {

                    const {email, password, name, birthDate} = req.body;

                    if(
                        isEmpty(email) || !isEmail(email) ||
                        isEmpty(password) ||
                        !isLength(password, {min:6, max: undefined}) ||
                        isEmpty(name)
                    ){
                        return res.json(new Message(['Field constraint violation']).error());
                    }

                    normalizeEmail(email);
                    trim(name);


                    let user = new User({
                        email: email,
                        password: password,
                        name: name,
                        birthDate: birthDate,
                        avatar: file.path
                    });

                    User.find({email: email})
                        .then((userExists) => {
                            if(!userExists.length > 0){
                                user.save()
                                    .then(() => {
                                        return res.json(new Message(['User successfully created']).success());
                                    })
                                    .catch((err) => {
                                        console.log(err);

                                        return res.json(new Message(['Can not create user', 'Internal server error']).error());
                                    });
                            }else{
                                return res.json(new Message(['User already exists in the database']).error());
                            }
                        })
                        .catch((err) =>{
                            console.log(err);
                            return res.json(new Message(['Can not create user', 'Internal server error']).error());
                         });

                })
                .catch((err) =>{
                    console.log(err);

                    return res.json(new Message(['Can not create user', 'Internal server error']).error());
                });

        }
    },
    signIn: {
        controller: (req, res) => {

        }
    }

};

export default UserController;