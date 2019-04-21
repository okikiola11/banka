import {
    Client,
} from 'pg';
import {
    dotenv,
} from 'dotenv';

dotenv.config();
// or native libpq bindings
// var pg = require('pg').native

const conString = process.env.ELEPHANTSQL; // Can be found in the Details page
const client = new Client(conString);
client.on('connect', () => {
    console.log('connected to postgres');
});

/** *  create users table
 * */
const createUsersTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        users(
            ID serial PRIMARY KEY,
            firstName varchar NOT NULL,
            lastName varchar NOT NULL,
            email varchar(128) NOT NULL UNIQUE,
            phone varchar,
            gender AS ENUM ('female', 'male'),
            password varchar(128) NOT NULL,
            isAdmin boolean NOT NULL DEFAULT
        )`;

    client.query(queryText)
        .then((res) => {
            console.log(res);
            client.end();
        })
        .catch((err) => {
            console.log(err);
            client.end();
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
            acctStatus AS ENUM ('active', 'dormant', 'loan'),
            accountBalance varchar NOT NULL,
            createdOn TIMESTAMP,
            updatedOn TIMESTAMP,
            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE
        )`;

    client.query(queryText)
        .then((res) => {
            console.log(res);
            client.end();
        })
        .catch((err) => {
            console.log(err);
            client.end();
        });
};

/** create Transactions Table
 * */
const createTransactionsTable = () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS
    transactions = (
        transactionId serial PRIMARY KEY,
        accountNumber varchar NOT NULL,
        amount varchar NOT NULL,
        cashier serial NOT NULL,
        transactionType AS ENUM ('debit', 'credit'),
        accountBalance varchar NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (transactionId) REFERENCES users (ID) ON DELETE CASCADE,
        FOREIGN KEY (cashier) REFERENCES users (ID) ON DELETE CASCADE
    )`;

    client.query(queryText)
        .then((res) => {
            console.log(res);
            client.end();
        })
        .catch((err) => {
            console.log(err);
            client.end();
        });
};

/** * Drop Users Table
 */
const dropUsersTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    client.query(queryText)
        .then((res) => {
            console.log(res);
            client.end();
        })
        .catch((err) => {
            console.log(err);
            client.end();
        });
};

/** * Drop Accounts Table */
const dropAccountTable = () => {
    const queryText = 'DROP TABLE IF EXISTS accounts returning *';
    client.query(queryText)
        .then((res) => {
            console.log(res);
            client.end();
        })
        .catch((err) => {
            console.log(err);
            client.end();
        });
};

/** * Drop Accounts Table */
const dropTransactionTable = () => {
    const queryText = 'DROP TABLE IF EXISTS transactions returning *';
    client.query(queryText)
        .then((res) => {
            console.log(res);
            client.end();
        })
        .catch((err) => {
            console.log(err);
            client.end();
        });
};

/** * Create All Tables */
const createAllTables = () => {
    createUsersTable();
    createAccountsTable();
    createTransactionsTable();
};
/** * Drop All Tables */
const dropAllTables = () => {
    dropUsersTable();
    dropAccountTable();
    dropTransactionTable();
};

client.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});
