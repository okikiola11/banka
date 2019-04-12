import {
    validationResult,
} from 'express-validator/check';
import transactions from '../utils/transactionsData';
import accountData from '../utils/accountsData';
import userdata from '../utils/userData';

class transaction {
    static async creditAccount(req, res) {
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
                amount,
                accountNumber,
            } = req.body;
            const Account = accountData.find(creditAccount => creditAccount.accountNumber === accountNumber); // get accountNumber from the list of account

            if (Account === undefined) { // if acct does not exist
                return res.status(404).json({
                    status: 404,
                    message: 'Account does not exist',
                });
            }

            const {
                accountBalance,
            } = Account;
            const creditAccountBal = parseFloat(+accountBalance + +amount);

            Account.accountBalance = creditAccountBal;
            const cashierData = userdata.find(details => details.id === req.data.id);
            const {
                firstName,
                lastName,
            } = cashierData;

            const newCreditTransaction = {
                transactionId: transactions[transactions.length - 1].transactionId + 1,
                accountNumber,
                amount,
                cashier: `${firstName} ${lastName}`,
                transactionType: 'credit',
                accountBalance: creditAccountBal,
                createdOn: new Date().toLocaleString(),
            };
            transactions.push(newCreditTransaction);

            return res.status(201).json({
                status: 201,
                message: 'Account has been successfully credited',
                data: [newCreditTransaction],
            });
        } catch (error) {
            return res.status(422).json({
                // 422 unprocessable entity
                status: 422,
                message: 'Transaction not completed',
            });
        }
    }
}

export default transaction;
