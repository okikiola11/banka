import jwt from 'jsonwebtoken';
import {
    config,
} from 'dotenv';

config();

class authMiddleware {
    // FORMAT OF TOKEN
    // Authorization: <access_token>
    static generateToken({
        id,
        type,
        isadmin,
    }) {
        return jwt.sign({
            id,
            type,
            isadmin,
        }, process.env.secret, {
            expiresIn: '24h', // expires in 24hours
        });
    }

    static verifyToken(req, res, next) {
        // Get the auth header value bcos the token should be sent in the header as the Authorization value
        const bearerHeader = req.headers.authorization;
        jwt.verify(bearerHeader, process.env.secret, (err, authData) => {
            if (err) {
                return res.sendStatus(403);
            }
            const {
                id,
                type,
                isAdmin,
            } = authData;
            req.data = {
                id,
                type,
                isAdmin,
            };
            next();
        });
    }
}

export default authMiddleware;
