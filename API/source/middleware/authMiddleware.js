import jwt from 'jsonwebtoken';
import config from '../config';

class authMiddleware {
    // FORMAT OF TOKEN
    // Authorization: <access_token>
    static generateToken({
        id,
        userType,
    }) {
        return jwt.sign({
            id,
            userType,
        }, config.secret, {
            expiresIn: 86400, // expires in 24hours
        });
    }

    static verifyToken(req, res, next) {
        // Get the auth header value bcos the token should be sent in the header as the Authorization value
        const bearerHeader = req.headers.authorization;
        jwt.verify(bearerHeader, config.secret, (err, authData) => {
            if (err) {
                return res.sendStatus(403);
            }
            const {
                id,
                userType,
            } = authData;
            req.data = {
                id,
                userType,
            };
            next();
        });
    }
}

export default authMiddleware;
