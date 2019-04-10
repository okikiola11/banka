import jwt from 'jsonwebtoken';
import config from '../config';
// import getUser from '../utils/userData';

class authMiddleware {
    // FORMAT OF TOKEN
    // Authorization: <access_token>
    static generateToken(userdetails) {
        return jwt.sign({
            userdetails,
        }, config.secret, {
            expiresIn: 86400, // expires in 24hours
        });
    }
}

export default authMiddleware;
