import db from '../db/index';

class User {
    static async SaveClient(firstName, lastName, email, password, accountType, isAdmin) {
        const query = `INSERT INTO
            users(firstName, lastName, email, password, type, isadmin)
            VALUES($1, $2, $3, $4, $5, $6)
            returning *`;
        const values = [firstName, lastName, email, password, accountType, isAdmin];
        const {
            rows,
        } = await db.query(query, values);

        return rows[0];
    }

    static async findByEmail(email) {
        const query = `
            SELECT * FROM users WHERE email = $1
        `;
        const values = [email];
        const {
            rows,
        } = await db.query(query, values);
        return rows[0];
    }

    static async findById(id) {
        const query = `
            SELECT * FROM users WHERE id = $1
        `;
        const values = [id];
        const {
            rows,
        } = await db.query(query, values);
        return rows[0];
    }
}

export default User;
