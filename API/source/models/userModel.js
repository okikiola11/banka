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
        const result = await db.query(query, values);

        return result;
    }

    // static async findByEmail(email) {
    //     console.log('ayobsfggh is male');
    //     const query = `
    //         SELECT * FROM users WHERE email = $1
    //     `;
    //     // const values = [email];
    //     const result = await db.query(query);
    //     console.log(result);
    //     console.log('ayobsfggh');
    //     return result;
    // }
}

export default User;
