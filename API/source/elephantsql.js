import {
    Pool,
} from 'pg';

import {
    config,
} from 'dotenv';

import 'make-runnable';

config();

// or native libpq bindings
// var pg = require('pg').native

const pool = new Pool({
    connectionString: process.env.ELEPHANTSQL,
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/** create Users table */
const createUsersTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    users(
        ID serial PRIMARY KEY,
        firstName varchar NOT NULL,
        lastName varchar NOT NULL,
        email varchar(128) NOT NULL UNIQUE,
        phone varchar,
        gender varchar,
        password varchar(128) NOT NULL
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
    const queryText = 'DROP TABLE IF EXISTS users returning *';
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
const dropAccountTable = () => {
    const queryText = 'DROP TABLE IF EXISTS accounts returning *';
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
    const queryText = 'DROP TABLE IF EXISTS transactions returning *';
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
    createAccountsTable();
    createTransactionsTable();
};

const dropAllTables = () => {
    dropUsersTable();
    dropAccountTable();
    dropTransactionTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export default {
    createUsersTable,
    createAccountsTable,
    createTransactionsTable,
    createAllTables,
    dropUsersTable,
    dropAccountTable,
    dropTransactionTable,
    dropAllTables,
};
