import db from '../db/index';

class Accounts {
    static async SaveAccount(accountNumber, ownerid, status, balance, type) {
        const query = `
            INSERT INTO
            accounts(accountNumber, ownerid, status, balance, type)
            VALUES ($1, $2, $3, $4, $5)
            returning *
        `;
        const values = [accountNumber, ownerid, status, balance, type];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }

    static async getAllAccounts() {
        const query = `
            SELECT * FROM accounts
        `;
        const {
            rows,
        } = await db.queryPool(query);
        return rows;
    }

    static async getSingleAccount(accountNumber) {
        const query = `
            SELECT * FROM accounts WHERE accountnumber = $1
        `;
        const values = [accountNumber];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }

    static async updateAccount(status, accountNumber) {
        const query = `
            SELECT * FROM accounts WHERE accountNumber = $1
        `;
        // const account = db.query(query);
        const values = [status, accountNumber];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }

    static async deleteAccount(accountNumber) {
        const query = `
            DELETE FROM accounts WHERE accountNumber = $1;
        `;
        const values = [accountNumber];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }
}

export default Accounts;
