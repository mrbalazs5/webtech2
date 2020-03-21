import jwt from 'jsonwebtoken';
import roles from '../utils/roles';

const secret = process.env.JWT_SECRET;

const authenticateUser = (req, res, next, role) => {

    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {

            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            }else if(role === 'admin' && decoded.role !== roles['admin']){
                res.status(401).send('Unauthorized: You don\'t have permission to see this resource');
            }
            else {
                req.user = decoded;
                next();
            }

        });
    }

};

export default authenticateUser;