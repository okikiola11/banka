"use strict";

var _pg = require("pg");

var _dotenv = require("dotenv");

var _this = void 0;

(0, _dotenv.config)(); // or native libpq bindings
// var pg = require('pg').native

var pool = new _pg.Pool({
  connectionString: process.env.ELEPHANTSQL
});
pool.on('connect', function () {
  console.log('connected to the db');
});
/** create Users table */

var createUsersTable = function createUsersTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n    users(\n        ID serial PRIMARY KEY,\n        firstName varchar NOT NULL,\n        lastName varchar NOT NULL,\n        email varchar(128) NOT NULL UNIQUE,\n        phone varchar,\n        gender AS ENUM ('female', 'male'),\n        password varchar(128) NOT NULL,\n        isAdmin boolean NOT NULL DEFAULT\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
/** * Create Accounts Table
 */


var createAccountsTable = function createAccountsTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        accounts(\n            ID serial PRIMARY KEY,\n            ownerID serial NOT NULL,\n            accountNumber varchar NOT NULL,\n            type varchar NOT NULL,\n            openingBalance varchar NOT NULL,\n            acctStatus AS ENUM ('active', 'dormant', 'loan'),\n            accountBalance varchar NOT NULL,\n            createdOn TIMESTAMP,\n            updatedOn TIMESTAMP,\n            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
/** create Transactions Table
 * */


var createTransactionsTable = function createTransactionsTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n    transactions = (\n        transactionId serial PRIMARY KEY,\n        accountNumber varchar NOT NULL,\n        amount varchar NOT NULL,\n        cashier serial NOT NULL,\n        transactionType AS ENUM ('debit', 'credit'),\n        accountBalance varchar NOT NULL,\n        createdOn TIMESTAMP,\n        FOREIGN KEY (transactionId) REFERENCES users (ID) ON DELETE CASCADE,\n        FOREIGN KEY (cashier) REFERENCES users (ID) ON DELETE CASCADE\n    )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
/** * Drop Users Table
 */


var dropUsersTable = function dropUsersTable() {
  var queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
/** * Drop Accounts Table */


var dropAccountTable = function dropAccountTable() {
  var queryText = 'DROP TABLE IF EXISTS accounts returning *';

  _this.pool.query(queryText).then(function (res) {
    console.log(res);

    _this.pool.end();
  }).catch(function (err) {
    console.log(err);

    _this.pool.end();
  });
};
/** * Drop Accounts Table */


var dropTransactionTable = function dropTransactionTable() {
  var queryText = 'DROP TABLE IF EXISTS transactions returning *';

  _this.pool.query(queryText).then(function (res) {
    console.log(res);

    _this.pool.end();
  }).catch(function (err) {
    console.log(err);

    _this.pool.end();
  });
};
/** create all tables
 */


var createAllTables = function createAllTables() {
  createUsersTable();
  createAccountsTable();
  createTransactionsTable();
};

var dropAllTables = function dropAllTables() {
  dropUsersTable();
  dropAccountTable();
  dropTransactionTable();
};

pool.on('remove', function () {
  console.log('client removed'); // process.exit(0);
});
module.exports = {
  createUsersTable: createUsersTable,
  createAccountsTable: createAccountsTable,
  createTransactionsTable: createTransactionsTable,
  createAllTables: createAllTables,
  dropUsersTable: dropUsersTable,
  dropAccountTable: dropAccountTable,
  dropTransactionTable: dropTransactionTable,
  dropAllTables: dropAllTables
};

require('make-runnable');