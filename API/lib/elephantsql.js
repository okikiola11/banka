"use strict";

var _pg = require("pg");

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _dotenv = require("dotenv");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)(); // or native libpq bindings
// var pg = require('pg').native

var pool = new _pg.Pool({
  connectionString: process.env.ELEPHANTSQL
});
pool.on('connect', function () {
  console.log('connected to the db');
});

var usertype = function usertype() {
  var queryText = 'SELECT * FROM members';
  pool.query(queryText, function (err, result) {
    if (err) {
      console.log(err.stack);
    } else {
      if (result.rows.length !== 0) {
        return;
      }

      var values = [['user'], ['admin'], ['staff']];
      var query1 = (0, _pgFormat.default)('INSERT INTO members (userType) VALUES %L returning *', values);
      pool.query(query1).then(function (res) {
        console.log(res.rows);
        pool.end();
      }).catch(function (err) {
        console.log(err);
        pool.end();
      });
    }
  });
};

var createUserTypeTable = function createUserTypeTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n    members(\n        ID serial PRIMARY KEY,\n        userType varchar NOT NULL\n    )";
  pool.query(queryText).then(function (res) {
    usertype();
    console.log(res);
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
/** create Users table */


var createUsersTable = function createUsersTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n    users(\n        ID serial PRIMARY KEY,\n        firstName varchar NOT NULL,\n        lastName varchar NOT NULL,\n        memberID INTEGER,\n        email varchar(128) NOT NULL UNIQUE,\n        phone varchar,\n        gender varchar,\n        password varchar(128) NOT NULL,\n        FOREIGN KEY (memberID) REFERENCES members (ID) ON DELETE CASCADE\n    )";
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
  var queryText = "CREATE TABLE IF NOT EXISTS\n        accounts(\n            ID serial PRIMARY KEY,\n            ownerID serial NOT NULL,\n            accountNumber varchar NOT NULL,\n            type varchar NOT NULL,\n            openingBalance varchar NOT NULL,\n            acctStatus varchar,\n            accountBalance varchar NOT NULL,\n            createdOn TIMESTAMP,\n            updatedOn TIMESTAMP,\n            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE\n        )";
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
  var queryText = "CREATE TABLE IF NOT EXISTS\n    transactions(\n        transactionId serial PRIMARY KEY,\n        accountNumber varchar NOT NULL,\n        amount varchar,\n        cashier serial NOT NULL,\n        transactionType varchar,\n        accountBalance varchar NOT NULL,\n        createdOn TIMESTAMP,\n        FOREIGN KEY (transactionId) REFERENCES users (ID) ON DELETE CASCADE\n    )";
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
  var queryText = 'DROP TABLE IF EXISTS users CASCADE';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};
/** * Drop Accounts Table */


var dropUserType = function dropUserType() {
  var queryText = 'DROP TABLE IF EXISTS members CASCADE returning *';

  _this.pool.query(queryText).then(function (res) {
    console.log(res);

    _this.pool.end();
  }).catch(function (err) {
    console.log(err);

    _this.pool.end();
  });
};
/** * Drop Accounts Table */


var dropAccountTable = function dropAccountTable() {
  var queryText = 'DROP TABLE IF EXISTS accounts CASCADE returning *';

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
  var queryText = 'DROP TABLE IF EXISTS transactions CASCADE returning *';

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
  createUserTypeTable();
  createAccountsTable();
  createTransactionsTable();
};

var dropAllTables = function dropAllTables() {
  dropUsersTable();
  dropAccountTable();
  dropUserType();
  dropTransactionTable();
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createUsersTable: createUsersTable,
  createUserTypeTable: createUserTypeTable,
  createAccountsTable: createAccountsTable,
  createTransactionsTable: createTransactionsTable,
  createAllTables: createAllTables,
  dropUsersTable: dropUsersTable,
  dropAccountTable: dropAccountTable,
  dropUserType: dropUserType,
  dropTransactionTable: dropTransactionTable,
  dropAllTables: dropAllTables
};

require('make-runnable');