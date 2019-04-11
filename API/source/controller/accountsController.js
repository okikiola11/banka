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

    static async deleteAccount(req, res) {
        try {
            const {
                accountNumber,
            } = req.body;
            const deletedAccount = await Accounts.find(
                deletedData => deletedData.accountNumber === accountNumber,
            );

            if (deletedAccount === -1) {
                return res.status(404).json({
                    status: 404,
                    error: 'Oooops! no record with such Id',
                });
            }
            Accounts.splice(deletedAccount);

            return res.status(200).json({
                status: 200,
                message: 'Account has been deleted successfully',
            });
        } catch (error) {
            return res.status(204).send({
                // 204 means no content
                success: '204',
                error: 'No account Id content available',
            });
        }
    }
}

export default accountsController;
