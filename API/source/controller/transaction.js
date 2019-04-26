import {
    validationResult,
} from 'express-validator/check';
import Transaction from '../models/transactionModel';
import Accounts from '../models/accountModel';
import User from '../models/userModel';

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

                return res.status(400).json({
                    status: 400,
                    error: 'Validation failed, check errors property for more details',
                    errors: errArray,
                });
            }
            const {
                amount,
                accountNumber,
            } = req.body;
            const account = await Accounts.getSingleAccount(accountNumber);
            if (!account) { // if acct does not exist
                return res.status(404).json({
                    status: 404,
                    message: 'Account does not exist',
                });
            }

            const {
                balance,
            } = account;
            const creditAccountBal = parseFloat(+balance + +amount);
            const credit = await Accounts.updateAccountBal(accountNumber, creditAccountBal);
            console.log(credit);
            const transactionData = await Transaction.creditTransaction(accountNumber, amount, req.data.id, 'credit', creditAccountBal);

            const {
                transactionid,
            } = transactionData;
            return res.status(201).json({
                status: 201,
                message: 'Account has been successfully credited',
                data: {
                    transactionId: transactionid,
                    accountNumber,
                    amount,
                    cashier: req.data.id,
                    transactionType: 'credit',
                    accountBalance: creditAccountBal,
                },
            });
        } catch (error) {
            console.log(error.stack);
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong while trying to credit your account',
            });
        }
    }

    static debitAccount(req, res) {
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
            const Account = accountData.find(account => account.accountNumber === accountNumber); // get accountNumber from the list of account
            const accountIndex = accountData.indexOf(Account);

            if (Account === undefined) { // if acct does not exist
                return res.status(404).json({
                    status: 404,
                    message: 'Account does not exist',
                });
            }

            const {
                accountBalance,
            } = Account;
            const getBal = parseInt(accountBalance, 10);
            const getAmount = parseInt(amount, 10);
            if (getBal < getAmount) {
                return res.status(409).json({
                    status: 409,
                    message: 'Insufficient funds for this transaction',
                });
            }
            const newAccountBal = parseFloat(accountBalance - amount);
            Account.accountBalance = newAccountBal;
            accountData.splice(accountIndex, 1, Account); // replaces 1 element(cuts off) at 1th index

            const cashierData = userdata.find(details => details.id === req.data.id);
            const {
                firstName,
                lastName,
            } = cashierData;
            const newTransaction = {
                transactionId: transactions[transactions.length - 1].transactionId + 1,
                accountNumber,
                amount,
                cashier: `${firstName} ${lastName}`,
                transactionType: 'debit',
                accountBalance: newAccountBal,
                createdOn: new Date().toLocaleString(),
            };
            transactions.push(newTransaction);

            return res.status(201).json({
                status: 201,
                message: 'Account has been debited successfully',
                data: [newTransaction],
            });
        } catch (error) {
            return res.status(422).json({
                status: 422,
                error: 'Transaction failed',
            });
        }
    }
}

export default transaction;