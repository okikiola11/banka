import {
    validationResult,
} from 'express-validator/check';
import Utility from '../utils/util';

import userdata from '../utils/userData';
import Accounts from '../utils/accountsData';

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

                return res.status(401).json({
                    status: 401,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }

            const {
                type,
                openingBalance,
            } = req.body;
            const userInfo = userdata.find(details => details.id === req.data.id);
            const {
                id,
            } = userInfo; // get owner Id from User table

            const accountNumber = Utility.acctNumberGen();
            const newlyCreatedAcct = {
                id: Accounts[Accounts.length - 1].id + 1,
                ownerId: id,
                accountNumber,
                type,
                openingBalance,
                acctStatus: 'active',
                accountBalance: openingBalance,
                createdOn: new Date().toLocaleString(),
                updatedOn: null,
            };
            Accounts.push(newlyCreatedAcct);

            return res.status(201).json({
                status: 201,
                message: 'Account has been created',
                data: [newlyCreatedAcct],
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
            return res.status(200).json({
                status: 200,
                message: 'Successfully retrieved all accounts',
                data: Accounts,
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: 'No account record found',
            });
        }
    }

    static async getSingleAccount(req, res) {
        try {
            const {
                accountNumber,
            } = req.params;
            const singleAcct = await Accounts.find(
                singleData => singleData.accountNumber === accountNumber,
            );
            if (singleAcct === undefined) {
                throw new Error('Account does not exist');
            }
            return res.status(200).json({
                status: 200,
                message: 'Account has been successfully retrieved',
                data: [singleAcct],
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: 'Account does not exist',
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

                return res.status(401).json({
                    status: 401,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }

            const {
                accountNumber,
            } = req.params;

            const AccountNo = Accounts.find(acc => acc.accountNumber === accountNumber);
            if (!AccountNo) {
                return res.status(404).json({
                    status: 404,
                    error: 'Account Number not found',
                });
            }
            const {
                id,
                ownerId,
                type,
                openBalance,
                accountBalance,
                createdOn,
            } = AccountNo;
            const updatedOn = new Date().toLocaleString();
            const {
                acctStatus,
            } = req.body;
            const updatedAccount = {
                id,
                ownerId,
                accountNumber,
                type,
                acctStatus,
                openBalance,
                accountBalance,
                createdOn,
                updatedOn,
            };

            Accounts.splice(Accounts.indexOf(AccountNo), 1, updatedAccount);
            return res.status(200).json({
                status: 200,
                message: 'Account has been succesfully updated',
                data: [{
                    id,
                    type,
                    accountNumber,
                    acctStatus,
                    updatedOn,
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
            const deletedAccount = await Accounts.find(
                deletedData => deletedData.accountNumber === accountNumber,
            );

            if (!deletedAccount) {
                return res.status(404).json({
                    status: 404,
                    error: 'Oooops! no record with such Account number',
                });
            }
            Accounts.splice(deletedAccount);

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
