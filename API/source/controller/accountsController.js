import {
    validationResult,
} from 'express-validator/check';
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
                accountNumber,
                type,
                openingBalance,
                accountBalance,
            } = req.body;
            const userInfo = userdata.find(details => details.id === req.data.id);
            const {
                id, // get owner Id from User table
            } = userInfo;
            console.log(id);

            const newlyCreatedAcct = {
                id: Accounts[Accounts.length - 1].id + 1,
                ownerId: id,
                accountNumber,
                type,
                openingBalance,
                acctStatus: 'active',
                accountBalance,
                createdOn: new Date().toLocaleString(),
            };
            Accounts.push(newlyCreatedAcct);

            return res.status(201).json({
                status: 201,
                message: 'Account has been created',
                data: [newlyCreatedAcct],
            });
        } catch (error) {
            return res.status(500)
                .json({
                    status: 500,
                    error: 'something went wrong while trying to create an account',
                });
        }
    }
}

export default accountsController;
