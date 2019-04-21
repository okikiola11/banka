"use strict";

var _pg = require("pg");

var _dotenv = require("dotenv");

_dotenv.dotenv.config(); // or native libpq bindings
// var pg = require('pg').native


var conString = process.env.ELEPHANTSQL; // Can be found in the Details page

var client = new _pg.Client(conString);
client.on('connect', function () {
  console.log('connected to postgres');
});
/** *  create users table
 * */

var createUsersTable = function createUsersTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        users(\n            ID serial PRIMARY KEY,\n            firstName varchar NOT NULL,\n            lastName varchar NOT NULL,\n            email varchar(128) NOT NULL UNIQUE,\n            phone varchar,\n            gender AS ENUM ('female', 'male'),\n            password varchar(128) NOT NULL,\n            isAdmin boolean NOT NULL DEFAULT\n        )";
  client.query(queryText).then(function (res) {
    console.log(res);
    client.end();
  }).catch(function (err) {
    console.log(err);
    client.end();
  });
};
/** * Create Accounts Table
 */


var createAccountsTable = function createAccountsTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        accounts(\n            ID serial PRIMARY KEY,\n            ownerID serial NOT NULL,\n            accountNumber varchar NOT NULL,\n            type varchar NOT NULL,\n            openingBalance varchar NOT NULL,\n            acctStatus AS ENUM ('active', 'dormant', 'loan'),\n            accountBalance varchar NOT NULL,\n            createdOn TIMESTAMP,\n            updatedOn TIMESTAMP,\n            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE\n        )";
  client.query(queryText).then(function (res) {
    console.log(res);
    client.end();
  }).catch(function (err) {
    console.log(err);
    client.end();
  });
};
/** create Transactions Table
 * */


var createTransactionsTable = function createTransactionsTable() {
  var queryText = "\n    CREATE TABLE IF NOT EXISTS\n    transactions = (\n        transactionId serial PRIMARY KEY,\n        accountNumber varchar NOT NULL,\n        amount varchar NOT NULL,\n        cashier serial NOT NULL,\n        transactionType AS ENUM ('debit', 'credit'),\n        accountBalance varchar NOT NULL,\n        createdOn TIMESTAMP,\n        FOREIGN KEY (transactionId) REFERENCES users (ID) ON DELETE CASCADE,\n        FOREIGN KEY (cashier) REFERENCES users (ID) ON DELETE CASCADE\n    )";
  client.query(queryText).then(function (res) {
    console.log(res);
    client.end();
  }).catch(function (err) {
    console.log(err);
    client.end();
  });
};
/** * Drop Users Table
 */


var dropUsersTable = function dropUsersTable() {
  var queryText = 'DROP TABLE IF EXISTS users returning *';
  client.query(queryText).then(function (res) {
    console.log(res);
    client.end();
  }).catch(function (err) {
    console.log(err);
    client.end();
  });
};
/** * Drop Accounts Table */


var dropAccountTable = function dropAccountTable() {
  var queryText = 'DROP TABLE IF EXISTS accounts returning *';
  client.query(queryText).then(function (res) {
    console.log(res);
    client.end();
  }).catch(function (err) {
    console.log(err);
    client.end();
  });
};
/** * Drop Accounts Table */


var dropTransactionTable = function dropTransactionTable() {
  var queryText = 'DROP TABLE IF EXISTS transactions returning *';
  client.query(queryText).then(function (res) {
    console.log(res);
    client.end();
  }).catch(function (err) {
    console.log(err);
    client.end();
  });
};
/** * Create All Tables */


var createAllTables = function createAllTables() {
  createUsersTable();
  createAccountsTable();
  createTransactionsTable();
};
/** * Drop All Tables */


var dropAllTables = function dropAllTables() {
  dropUsersTable();
  dropAccountTable();
  dropTransactionTable();
};

client.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});