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
            await Accounts.updateAccountBal(accountNumber, creditAccountBal);
            const transactionData = await Transaction.transact(accountNumber, amount, req.data.id, 'credit', creditAccountBal);

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
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong while trying to credit your account',
            });
        }
    }

    static async debitAccount(req, res) {
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

            const getBal = parseInt(balance, 10);
            const getAmount = parseInt(amount, 10);
            if (getBal < getAmount) {
                return res.status(409).json({
                    status: 409,
                    message: 'Insufficient funds for this transaction',
                });
            }
            const newAccountBal = parseFloat(getBal - getAmount);
            await Accounts.updateAccountBal(accountNumber, newAccountBal);
            const transactionData = await Transaction.transact(accountNumber, amount, req.data.id, 'debit', newAccountBal);

            const {
                transactionid,
            } = transactionData;
            return res.status(201).json({
                status: 201,
                message: 'Account has been successfully debited',
                data: {
                    transactionId: transactionid,
                    accountNumber,
                    amount,
                    cashier: req.data.id,
                    transactionType: 'debit',
                    accountBalance: newAccountBal,
                },
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Something went wrong',
            });
        }
    }
}

export default transaction;