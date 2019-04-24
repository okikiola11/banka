import {
    Pool,
} from 'pg';
import format from 'pg-format';

import {
    config,
} from 'dotenv';

config();

// or native libpq bindings
// var pg = require('pg').native

const pool = new Pool({
    connectionString: process.env.ELEPHANTSQL,
});

pool.on('connect', () => {
    console.log('connected to the db');
});

const usertype = () => {
    const queryText = 'SELECT * FROM members';

    pool.query(queryText, (err, result) => {
        if (err) {
            console.log(err.stack);
        } else {
            if (result.rows.length !== 0) {
                return;
            }
            const values = [
                ['user'],
                ['admin'],
                ['staff'],
            ];
            const query1 = format('INSERT INTO members (userType) VALUES %L returning *', values);

            pool.query(query1)
                .then((res) => {
                    console.log(res.rows);
                    pool.end();
                })
                .catch((err) => {
                    console.log(err);
                    pool.end();
                });
        }
    });
};


const createUserTypeTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    members(
        ID serial PRIMARY KEY,
        userType varchar NOT NULL
    )`;

    pool.query(queryText)
        .then((res) => {
            usertype();
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/** create Users table */
const createUsersTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    users(
        ID serial PRIMARY KEY,
        firstName varchar NOT NULL,
        lastName varchar NOT NULL,
        memberID INTEGER,
        email varchar(128) NOT NULL UNIQUE,
        phone varchar,
        gender varchar,
        password varchar(128) NOT NULL,
        FOREIGN KEY (memberID) REFERENCES members (ID) ON DELETE CASCADE
    )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/** * Create Accounts Table
 */
const createAccountsTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        accounts(
            ID serial PRIMARY KEY,
            ownerID serial NOT NULL,
            accountNumber varchar NOT NULL,
            type varchar NOT NULL,
            openingBalance varchar NOT NULL,
            acctStatus varchar,
            accountBalance varchar NOT NULL,
            createdOn TIMESTAMP,
            updatedOn TIMESTAMP,
            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE
        )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/** create Transactions Table
 * */
const createTransactionsTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    transactions(
        transactionId serial PRIMARY KEY,
        accountNumber varchar NOT NULL,
        amount varchar,
        cashier serial NOT NULL,
        transactionType varchar,
        accountBalance varchar NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (transactionId) REFERENCES users (ID) ON DELETE CASCADE
    )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/** * Drop Users Table
 */
const dropUsersTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users CASCADE';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/** * Drop Accounts Table */
const dropUserType = () => {
    const queryText = 'DROP TABLE IF EXISTS members CASCADE returning *';
    this.pool.query(queryText)
        .then((res) => {
            console.log(res);
            this.pool.end();
        })
        .catch((err) => {
            console.log(err);
            this.pool.end();
        });
};

/** * Drop Accounts Table */
const dropAccountTable = () => {
    const queryText = 'DROP TABLE IF EXISTS accounts CASCADE returning *';
    this.pool.query(queryText)
        .then((res) => {
            console.log(res);
            this.pool.end();
        })
        .catch((err) => {
            console.log(err);
            this.pool.end();
        });
};

/** * Drop Accounts Table */
const dropTransactionTable = () => {
    const queryText = 'DROP TABLE IF EXISTS transactions CASCADE returning *';
    this.pool.query(queryText)
        .then((res) => {
            console.log(res);
            this.pool.end();
        })
        .catch((err) => {
            console.log(err);
            this.pool.end();
        });
};

/** create all tables
 */
const createAllTables = () => {
    createUsersTable();
    createUserTypeTable();
    createAccountsTable();
    createTransactionsTable();
};

const dropAllTables = () => {
    dropUsersTable();
    dropAccountTable();
    dropUserType();
    dropTransactionTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createUsersTable,
    createUserTypeTable,
    createAccountsTable,
    createTransactionsTable,
    createAllTables,
    dropUsersTable,
    dropAccountTable,
    dropUserType,
    dropTransactionTable,
    dropAllTables,
};

require('make-runnable');
