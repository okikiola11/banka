import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import authMiddleware from '../middleware/authMiddleware';

class UserController {
    static async signupUser(req, res) {
        try {
            const {
                firstName,
                lastName,
                email,
                type,
                isadmin,
            } = req.body;
            let accountType; // get accttype
            let isAdmin; // get isadmin type
            if (type === undefined) {
                accountType = 'client';
            } else {
                accountType = type;
            }
            if (isadmin === undefined) {
                isAdmin = false;
            } else {
                isAdmin = true;
            }

            const member = await User.findByEmail(email);
            if (member) { // if email already exist
                return res.status(409).json({
                    status: 409,
                    message: 'Email already exist',
                });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const client = await User.SaveClient(firstName, lastName, email, hashedPassword, accountType, isAdmin);
            /* new user to be created */
            const {
                id,
                // type,
                // isadmin,
            } = client;
            const token = authMiddleware.generateToken({
                id,
                type: accountType,
                isadmin: isAdmin,
            });
            return res.status(201).json({
                status: 201,
                message: 'New User has been created',
                data: [{
                    id,
                    token,
                    firstName,
                    lastName,
                    email,
                }],
            });
        } catch (error) {
            return res.status(500)
                .json({
                    status: 500,
                    error: 'something went wrong while trying to create a user',
                });
        }
    }

    static async loginUser(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;

            const client = await User.findByEmail(email);

            if (!client) {
                return res.status(404).json({
                    status: 404,
                    error: 'User not found',
                });
            }
            const passwordIsValid = await bcrypt.compare(password, client.password);
            if (!passwordIsValid) {
                return res.status(403).json({
                    status: 403,
                    auth: 'false',
                    message: 'Incorrect Password',
                });
            }

            const {
                id,
                type,
                isadmin,
                firstname,
                lastname,
            } = client;

            const token = authMiddleware.generateToken({
                id,
                isadmin,
                type,
            });
            return res.status(200).json({
                status: 200,
                message: `Welcome ${email}, you have successfully logged in`,
                data: {
                    id,
                    token,
                    firstName: firstname,
                    lastName: lastname,
                    email,
                },
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                message: 'User record does not exist',
            });
        }
    }
}

export default UserController;