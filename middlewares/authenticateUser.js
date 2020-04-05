import jwt from 'jsonwebtoken';
import roles from '../utils/roles';
import Message from '../utils/Message';

//checks if an authentication token is available, and checks for other privilegs
const authenticateUser = (role) => {

    const secret = process.env.JWT_SECRET;

    return (req, res, next) => {

        try{

            const token =
                req.body.authToken ||
                req.query.authToken ||
                req.headers['x-access-token'] ||
                req.cookies.authToken;

            if (!token) {
                return res.status(401).json(new Message(['Unauthorized: No token provided']).error());
            } else {
                jwt.verify(token, secret, (err, decoded) => {

                    if (err) {
                        console.log(err);
                        throw new Error('Unauthorized: Invalid token');
                    }
                    else {
                        req.user = decoded;
                        next();
                    }

                });
            }

        }catch (err) {
            return res.status(401).json(new Message([err]).error());
        }

    };

};

export default authenticateUser;