import Transaction from '../models/transactionModel';
import Accounts from '../models/accountModel';

class transaction {
    static async creditAccount(req, res) {
        try {
            const {
                amount,
            } = req.body;
            const {
                accountNumber,
            } = req.params;
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
            const transactionData = await Transaction.transact(accountNumber, amount, req.data.id, 'credit', creditAccountBal, balance);

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

    static async debitAccount(req, res) {
        try {
            const {
                amount,
            } = req.body;
            const {
                accountNumber,
            } = req.params;
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
            const transactionData = await Transaction.transact(accountNumber, amount, req.data.id, 'debit', balance, newAccountBal);
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
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Something went wrong while trying to debit your account',
            });
        }
    }

    static async getSingleTransactions(req, res) {
        try {
            const {
                transactionId,
            } = req.params;

            const allTransaction = await Transaction.getSingleTransactions(transactionId);
            if (!allTransaction) { // no transactions
                return res.status(404).json({
                    status: 404,
                    error: 'No account transaction found',
                });
            }
            const {
                transactionid,
                amount,
                transactiontype,
                newbalance,
                oldbalance,
                createdon,
                accountnumber,
            } = allTransaction;
            return res.status(200).json({
                status: 200,
                message: 'Transaction has been successfully retrieved',
                data: {
                    transactionId: transactionid,
                    createdOn: createdon,
                    type: transactiontype,
                    accountNumber: accountnumber,
                    amount,
                    oldBalance: oldbalance,
                    newBalance: newbalance,
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Something went wrong while trying to retrieve all accounts',
            });
        }
    }
}

export default transaction;
