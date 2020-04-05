import jwt from 'jsonwebtoken';
import roles from '../utils/roles';
import Message from '../utils/Message';

const secret = process.env.JWT_SECRET;

//checks if an authentication token is available, and checks for other privilegs
const authenticateUser = (req, res, next, role) => {

    const token =
        req.body.authToken ||
        req.query.authToken ||
        req.headers['x-access-token'] ||
        req.cookies.authToken;

    if (!token) {
        res.status(401).json(new Message('Unauthorized: No token provided').error());
    } else {
        jwt.verify(token, secret, (err, decoded) => {

            if (err) {
                res.status(401).json(new Message('Unauthorized: Invalid token'));
            }else if(role === 'admin' && decoded.role !== roles.admin){
                res.status(401).json(new Message('Unauthorized: You don\'t have permission to see this resource'));
            }
            else {
                req.user = decoded;
                next();
            }

        });
    }

};

export default authenticateUser;