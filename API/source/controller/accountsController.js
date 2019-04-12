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

    static async getSingleAccount(req, res) {
        try {
            const {
                accountNumber,
            } = req.body;
            const singleAcct = await Accounts.find(
                singleData => singleData.accountNumber === accountNumber,
            );
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
}

export default accountsController;
