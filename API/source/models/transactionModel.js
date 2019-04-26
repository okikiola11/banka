import db from '../db/index';

class Transaction {
    constructor(accountNumber, amount, cashierID, transactionType, accountBalance) {
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.cashierID = cashierID;
        this.transactionType = transactionType;
        this.accountBalance = accountBalance;
    }

    static async creditTransaction(accountNumber, amount, cashierID, transactionType, accountBalance) {
        const query = `
            INSERT INTO
            transactions(accountnumber, amount, cashierid, transactiontype, accountbalance)
            VALUES ($1, $2, $3, $4, $5)
            returning *
        `;
        const values = [accountNumber, amount, cashierID, transactionType, accountBalance];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }
}

export default Transaction;