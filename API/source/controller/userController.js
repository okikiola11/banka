import bcrypt from 'bcryptjs';
import {
    validationResult,
} from 'express-validator/check';
import User from '../utils/userData';
import authMiddleware from '../middleware/authMiddleware';

class userController {
    static async signupUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const validateErrors = errors.array();

                const errArray = validateErrors.map((obj) => {
                    const rObj = {};
                    rObj[obj.param] = obj.msg;
                    rObj.value = obj.value;
                    return rObj;
                });

                return res.status(401).json({
                    status: 401,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }

            const {
                firstName,
                lastName,
                email,
                phone,
                gender,
            } = req.body;
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const newId = User[User.length - 1].id + 1; // get the id of the newly created user
            const userType = {
                user: true,
                admin: false,
                staff: false,
            };
            /* new user to be created */
            const user = {
                id: newId,
                firstName,
                lastName,
                email,
                phone,
                gender,
                password: hashedPassword,
                userType,
            };
            User.push(user);

            const payLoad = {
                newId,
                firstName,
                lastName,
                email,
                phone,
                gender,
                userType,
            };
            const token = authMiddleware.generateToken({
                id: newId,
                userType,
            });

            return res.status(201).json({
                status: 201,
                message: 'New User has been created',
                data: [{
                    auth: 'true',
                    token,
                    payLoad,
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const validateErrors = errors.array();

                const errArray = validateErrors.map((obj) => {
                    const rObj = {};
                    rObj[obj.param] = obj.msg;
                    rObj.value = obj.value;
                    return rObj;
                });

                return res.status(401).json({
                    status: 401,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }

            const {
                email,
                password,
            } = req.body;

            const user = User.find(member => member.email === email);

            if (!user) {
                return res.status(404).send('No user found.');
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({
                    status: 401,
                    auth: 'false',
                    message: 'Incorrect Password',
                });
            }

            const {
                id,
                userType,
                firstName,
                newId,
                lastName,
            } = user;

            const token = authMiddleware.generateToken({
                id,
                userType,
            });
            const payLoad = {
                newId,
                firstName,
                lastName,
                email,
                userType,
            };

            return res.status(200).json({
                status: 200,
                message: `Welcome ${user.email}, you have successfully logged in`,
                data: [{
                    auth: 'true',
                    token,
                    payLoad,
                }],
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                message: 'User record does not exist',
            });
        }
    }
}

export default userController;
