import db from '../db/index';

class Transaction {
    static async transact(accountNumber, amount, cashierID, transactionType, oldBalance, newBalance) {
        const query = `
            INSERT INTO
            transactions(accountnumber, amount, cashierid, transactiontype, oldBalance, newbalance)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning *
        `;
        const values = [accountNumber, amount, cashierID, transactionType, oldBalance, newBalance];
        const {
            rows,
        } = await db.query(query, values);
        return rows[0];
    }

    static async getSingleTransactions(transactionId) {
        const query = `
            SELECT * FROM transactions  WHERE transactionId = $1
        `;
        const values = [transactionId];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }
}

export default Transaction;
