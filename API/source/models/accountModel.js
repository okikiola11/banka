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
        const updatedOn = new Date().toLocaleString();
        const query = `
            UPDATE accounts SET status = $1, updatedon = $2 WHERE accountNumber = $3 RETURNING *
        `;
        const values = [status, updatedOn, accountNumber];
        const {
            rows,
        } = await db.query(query, values);
        return rows[0];
    }

    static async updateAccountBal(accountNumber, balance) {
        const updatedOn = new Date().toLocaleString();
        const query = `
            UPDATE accounts SET balance = $1, updatedon = $2 WHERE accountnumber = $3 RETURNING *
        `;
        const values = [balance, updatedOn, accountNumber];
        const {
            rows,
        } = await db.query(query, values);
        return rows[0];
    }

    static async deleteAccount(accountNumber) {
        const query = `
            DELETE FROM accounts WHERE accountNumber = $1 RETURNING *;
        `;
        const values = [accountNumber];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }

    static async getDormantAccount() {
        const query = `
            SELECT * FROM accounts WHERE status = 'dormant'
        `;
        const {
            rows,
        } = await db.queryPool(query);
        return rows;
    }

    static async getActiveAccount() {
        const query = `
            SELECT * FROM accounts WHERE status = 'active'
        `;
        const {
            rows,
        } = await db.queryPool(query);
        return rows;
    }

    static async getDraftAccount() {
        const query = `
            SELECT * FROM accounts WHERE status = 'draft'
        `;
        const {
            rows,
        } = await db.queryPool(query);
        return rows;
    }

    static async getClientAccounts(id) {
        const query = `
            SELECT * FROM accounts WHERE ownerid = $1
        `;
        const values = [id];
        const {
            rows,
        } = await db.query(query, values);
        return rows;
    }

    static async clientDraftAccount(id) {
        const query = `
            SELECT * FROM accounts WHERE ownerid = $1 AND status = $2
        `;
        const values = [id, 'draft'];
        const {
            rows,
        } = await db.query(query, values);
        return rows;
    }

    static async clientActiveAccount(id) {
        const query = `
        SELECT * FROM accounts WHERE ownerid = $1 AND status = $2
    `;
        const values = [id, 'active'];
        const {
            rows,
        } = await db.query(query, values);
        return rows;
    }

    static async clientDormantAccount(id) {
        const query = `
        SELECT * FROM accounts WHERE ownerid = $1 AND status = $2
    `;
        const values = [id, 'dormant'];
        const {
            rows,
        } = await db.query(query, values);
        return rows;
    }
}

export default Accounts;