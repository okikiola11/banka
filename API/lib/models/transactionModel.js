"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);
  }

  _createClass(Transaction, null, [{
    key: "transact",
    value: function () {
      var _transact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(accountNumber, amount, cashierID, transactionType, oldBalance, newBalance) {
        var query, values, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            INSERT INTO\n            transactions(accountnumber, amount, cashierid, transactiontype, oldBalance, newbalance)\n            VALUES ($1, $2, $3, $4, $5, $6)\n            returning *\n        ";
                values = [accountNumber, amount, cashierID, transactionType, oldBalance, newBalance];
                _context.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function transact(_x, _x2, _x3, _x4, _x5, _x6) {
        return _transact.apply(this, arguments);
      }

      return transact;
    }()
  }, {
    key: "getSingleTransactions",
    value: function () {
      var _getSingleTransactions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(transactionId) {
        var query, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n            SELECT * FROM transactions  WHERE transactionId = $1\n        ";
                values = [transactionId];
                _context2.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows[0]);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getSingleTransactions(_x7) {
        return _getSingleTransactions.apply(this, arguments);
      }

      return getSingleTransactions;
    }()
  }, {
    key: "getAccountTransaction",
    value: function () {
      var _getAccountTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(accountNumber) {
        var query, values, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n        SELECT * FROM transactions  WHERE accountnumber = $1\n        ";
                values = [accountNumber];
                _context3.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAccountTransaction(_x8) {
        return _getAccountTransaction.apply(this, arguments);
      }

      return getAccountTransaction;
    }()
  }]);

  return Transaction;
}();

var _default = Transaction;
exports.default = _default;