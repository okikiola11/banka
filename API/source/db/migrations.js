import db from './index';
import seeders from './seeders';

/** create Users table */
const createTables = async () => {
    const queryText = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS transactions CASCADE;

    CREATE TABLE IF NOT EXISTS
    users(
        ID serial PRIMARY KEY,
        firstName varchar NOT NULL,
        lastName varchar NOT NULL,
        email varchar(128) NOT NULL UNIQUE,
        password varchar(355) NOT NULL,
        type VARCHAR(6) NOT NULL DEFAULT ('client'),
        isAdmin BOOLEAN NOT NULL DEFAULT (false),
        createdOn TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS
        accounts(
            ID serial PRIMARY KEY,
            ownerID INTEGER NOT NULL,
            accountNumber varchar NOT NULL UNIQUE,
            type varchar NOT NULL,
            status varchar,
            balance float(2) NOT NULL,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            updatedOn TIMESTAMP NULL,
            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE
        );

    CREATE TABLE IF NOT EXISTS
        transactions(
            transactionId serial PRIMARY KEY,
            accountNumber varchar NOT NULL,
            amount varchar,
            cashierID INTEGER NOT NULL,
            transactionType varchar,
            accountBalance varchar NOT NULL,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (cashierID) REFERENCES users (ID) ON DELETE CASCADE
        );
    `;
    // await db.query(queryText + seeders);
    try {
        await db.queryPool(queryText + seeders);
    } catch (err) {
        console.log(err.stack);
    }
};

createTables();