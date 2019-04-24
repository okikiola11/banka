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
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const client = await User.SaveClient(firstName, lastName, email, hashedPassword);

            /* new user to be created */
            const [user] = client.rows;
            const {
                id,
                type,
                isadmin,
            } = user;

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

            const text = `
                SELECT * FROM users WHERE email = $1
            `;
            const values = [email];
            const {
                rows,
            } = await db.query(text, values);
            if (!rows[0]) {
                return res.status(400).json({
                    status: 400,
                    error: 'User not found',
                });
            }

            const passwordIsValid = await bcrypt.compare(password, rows[0].password);
            if (!passwordIsValid) {
                return res.status(400).json({
                    status: 400,
                    auth: 'false',
                    message: 'Incorrect Password',
                });
            }

            const {
                id,
                isadmin,
                firstName,
                lastName,
            } = rows;

            const token = authMiddleware.generateToken({
                id,
                isadmin,
            });
            const payLoad = {
                id,
                firstName,
                lastName,
                email,
                isadmin,
            };

            return res.status(200).json({
                status: 200,
                message: `Welcome ${rows.email}, you have successfully logged in`,
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
