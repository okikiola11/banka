import bcrypt from 'bcryptjs';
import {
    validationResult,
} from 'express-validator/check';
import User from '../models/userModel';
import authMiddleware from '../middleware/authMiddleware';
import db from '../db';

class UserController {
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

                return res.status(400).json({
                    status: 400,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }

            const {
                firstName,
                lastName,
                email,
            } = req.body;
            const member = await User.findByEmail(email);
            if (member) { // if email already exist
                return res.status(409).json({
                    status: 409,
                    message: 'Email already exist',
                });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const client = await User.SaveClient(firstName, lastName, email, hashedPassword);

            /* new user to be created */
            const {
                id,
                type,
                isadmin,
            } = client;

            const payLoad = {
                id,
                firstName,
                lastName,
                email,
                type,
                isadmin,
            };
            const token = authMiddleware.generateToken({
                id,
                type,
                isadmin,
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

                return res.status(400).json({
                    status: 400,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }

            const {
                email,
                password,
            } = req.body;

            const client = await User.findByEmail(email);
            if (!client) {
                return res.status(400).json({
                    status: 400,
                    error: 'User not found',
                });
            }
            const passwordIsValid = await bcrypt.compare(password, client.password);
            if (!passwordIsValid) {
                return res.status(400).json({
                    status: 400,
                    auth: 'false',
                    message: 'Incorrect Password',
                });
            }

            const {
                id,
                type,
                isadmin,
                firstName,
                lastName,
            } = client;

            const token = authMiddleware.generateToken({
                id,
                isadmin,
                type,
            });
            const payLoad = {
                id,
                firstName,
                lastName,
                email,
                isadmin,
                type,
            };

            return res.status(200).json({
                status: 200,
                message: `Welcome ${email}, you have successfully logged in`,
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

export default UserController;
