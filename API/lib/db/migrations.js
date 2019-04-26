"use strict";

var _index = _interopRequireDefault(require("./index"));

var _seeders = _interopRequireDefault(require("./seeders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** create Users table */
var createTables =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var queryText;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryText = "\n    DROP TABLE IF EXISTS users CASCADE;\n    DROP TABLE IF EXISTS accounts CASCADE;\n    DROP TABLE IF EXISTS transactions CASCADE;\n\n    CREATE TABLE IF NOT EXISTS\n    users(\n        ID serial PRIMARY KEY,\n        firstName varchar NOT NULL,\n        lastName varchar NOT NULL,\n        email varchar(128) NOT NULL UNIQUE,\n        password varchar(355) NOT NULL,\n        type VARCHAR(6) NOT NULL DEFAULT ('client'),\n        isAdmin BOOLEAN NOT NULL DEFAULT (false),\n        createdOn TIMESTAMP NOT NULL DEFAULT NOW()\n    );\n\n    CREATE TABLE IF NOT EXISTS\n        accounts(\n            ID serial PRIMARY KEY,\n            ownerID INTEGER NOT NULL,\n            accountNumber varchar NOT NULL UNIQUE,\n            type varchar NOT NULL,\n            status varchar,\n            balance float(2) NOT NULL,\n            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),\n            updatedOn TIMESTAMP NULL,\n            FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE\n        );\n\n    CREATE TABLE IF NOT EXISTS\n        transactions(\n            transactionId serial PRIMARY KEY,\n            accountNumber varchar NOT NULL,\n            amount varchar,\n            cashierID INTEGER NOT NULL,\n            transactionType varchar,\n            accountBalance varchar NOT NULL,\n            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),\n            FOREIGN KEY (cashierID) REFERENCES users (ID) ON DELETE CASCADE\n        );\n    "; // await db.query(queryText + seeders);

            _context.prev = 1;
            _context.next = 4;
            return _index.default.queryPool(queryText + _seeders.default);

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0.stack);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));

  return function createTables() {
    return _ref.apply(this, arguments);
  };
}();

createTables();