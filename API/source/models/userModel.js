import db from '../db/index';

class User {
    constructor(firstName, lastName, email, password, type, isAdmin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.type = type;
        this.isAdmin = isAdmin;
    }

    static async SaveClient(firstName, lastName, email, password) {
        const query = `INSERT INTO
            users(firstName, lastName, email, password)
            VALUES($1, $2, $3, $4)
            returning *`;
        const values = [firstName, lastName, email, password];
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
