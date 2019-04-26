import {
    validationResult,
} from 'express-validator/check';
import Utility from '../utils/util';
import Accounts from '../models/accountModel';
import User from '../models/userModel';

class accountsController {
    static async createAccount(req, res) {
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
                type,
            } = req.body;

            const accountNumber = Utility.acctNumberGen();
            const {
                id,
            } = req.data; // get owner Id from User table
            const newAccount = await Accounts.SaveAccount(accountNumber, id, 'draft', parseFloat(0), type);
            const {
                balance,
            } = newAccount;

            const userData = await User.findById(id);
            const {
                firstname,
                lastname,
                email,
            } = userData;

            return res.status(201).json({
                status: 201,
                message: 'Account has been created',
                data: {
                    accountNumber,
                    firstName: firstname, // account owner first name
                    lastName: lastname, // account owner last name
                    email, // account owner email
                    type,
                    openingBalance: balance,
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'something went wrong while trying to create an account',
            });
        }
    }

    static async getAllAccount(req, res) {
        try {
            const isQuery = Object.keys(req.query).length;
            if (isQuery) {
                const {
                    status,
                } = req.query;
                if (status === 'dormant') {
                    const accounts = await Accounts.getDormantAccount();
                    if (accounts.length === 0) {
                        return res.status(200).json({
                            status: 200,
                            message: 'There are no existing dormant account',
                            data: accounts,
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: 'Successfully retrieved all dormant accounts',
                        data: accounts,
                    });
                }
                if (status === 'active') {
                    const accounts = await Accounts.getActiveAccount();
                    if (accounts.length === 0) {
                        return res.status(200).json({
                            status: 200,
                            message: 'There are no existing active account',
                            data: accounts,
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: 'Successfully retrieved all active accounts',
                        data: accounts,
                    });
                }
                if (status === 'draft') {
                    const accounts = await Accounts.getDraftAccount();
                    if (accounts.length === 0) {
                        return res.status(200).json({
                            status: 200,
                            message: 'There are no existing draft account',
                            data: accounts,
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: 'Successfully retrieved all draft accounts',
                        data: accounts,
                    });
                }
            }
            const accounts = await Accounts.getAllAccounts();
            if (accounts.length === 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'There are no existing account',
                    data: accounts,
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Successfully retrieved all accounts',
                data: accounts,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Something went wrong while trying to retrieve all accounts',
            });
        }
    }

    static async getSingleAccount(req, res) {
        try {
            const {
                accountNumber,
            } = req.params;
            const account = await Accounts.getSingleAccount(accountNumber);
            if (!account) {
                throw new Error('Account does not exist');
            }
            const {
                ownerid,
            } = account; // check if user is actually the acct owner
            if (ownerid !== req.data.id && req.data.type === 'client') {
                throw new Error('Unauthorized');
            }
            return res.status(200).json({
                status: 200,
                message: 'Account has been successfully retrieved',
                data: [account],
            });
        } catch (error) {
            if (error.message === 'Account does not exist') {
                return res.status(404).json({
                    status: 404,
                    message: 'Account does not exist',
                });
            }
            if (error.message === 'Unauthorized') {
                return res.status(403).json({
                    status: 403,
                    message: 'This account does not belong to you',
                });
            }
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong while trying to retrieve account',
            });
        }
    }

    static async updateAccount(req, res) {
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
                status,
            } = req.body;
            const {
                accountNumber,
            } = req.params;

            const account = await Accounts.updateAccount(status, accountNumber);
            if (!account) {
                return res.status(404).json({
                    status: 404,
                    error: 'Account Number not found',
                });
            }

            return res.status(200).json({
                status: 200,
                message: 'Account has been succesfully updated',
                data: [{
                    accountNumber,
                    status,
                }],
            });
        } catch (error) {
            return res.status(500).json({
                status: 500, // 500 no available content
                error: 'Something went wrong while trying to update your account',
            });
        }
    }

    static async deleteAccount(req, res) {
        try {
            const {
                accountNumber,
            } = req.params;
            const deletedAccount = await Accounts.deleteAccount(accountNumber);
            if (!deletedAccount) {
                return res.status(404).json({
                    status: 404,
                    error: 'Oooops! no record with such Account number',
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Account has been deleted successfully',
            });
        } catch (error) {
            return res.status(500).send({
                status: '500',
                error: 'Something went wrong while trying to delete, try again',
            });
        }
    }
}

export default accountsController;
