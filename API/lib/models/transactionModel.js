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
  function Transaction(accountNumber, amount, cashierID, transactionType, accountBalance) {
    _classCallCheck(this, Transaction);

    this.accountNumber = accountNumber;
    this.amount = amount;
    this.cashierID = cashierID;
    this.transactionType = transactionType;
    this.accountBalance = accountBalance;
  }

  _createClass(Transaction, null, [{
    key: "creditTransaction",
    value: function () {
      var _creditTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(accountNumber, amount, cashierID, transactionType, accountBalance) {
        var query, values, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            INSERT INTO\n            transactions(accountnumber, amount, cashierid, transactiontype, accountbalance)\n            VALUES ($1, $2, $3, $4, $5)\n            returning *\n        ";
                values = [accountNumber, amount, cashierID, transactionType, accountBalance];
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

      function creditTransaction(_x, _x2, _x3, _x4, _x5) {
        return _creditTransaction.apply(this, arguments);
      }

      return creditTransaction;
    }()
  }]);

  return Transaction;
}();

var _default = Transaction;
exports.default = _default;