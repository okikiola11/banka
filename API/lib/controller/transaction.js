"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

var _transactionsData = _interopRequireDefault(require("../utils/transactionsData"));

var _accountsData = _interopRequireDefault(require("../utils/accountsData"));

var _userData = _interopRequireDefault(require("../utils/userData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transaction =
/*#__PURE__*/
function () {
  function transaction() {
    _classCallCheck(this, transaction);
  }

  _createClass(transaction, null, [{
    key: "creditAccount",
    value: function () {
      var _creditAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var errors, validateErrors, errArray, _req$body, amount, accountNumber, Account, accountBalance, creditAccountBal, cashierData, firstName, lastName, newCreditTransaction;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context.next = 6;
                  break;
                }

                validateErrors = errors.array();
                errArray = validateErrors.map(function (obj) {
                  var rObj = {};
                  rObj[obj.param] = obj.msg;
                  rObj.value = obj.value;
                  return rObj;
                });
                return _context.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                _req$body = req.body, amount = _req$body.amount, accountNumber = _req$body.accountNumber;
                Account = _accountsData.default.find(function (creditAccount) {
                  return creditAccount.accountNumber === accountNumber;
                }); // get accountNumber from the list of account

                if (!(Account === undefined)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Account does not exist'
                }));

              case 10:
                accountBalance = Account.accountBalance;
                creditAccountBal = parseFloat(+accountBalance + +amount);
                Account.accountBalance = creditAccountBal;
                cashierData = _userData.default.find(function (details) {
                  return details.id === req.data.id;
                });
                firstName = cashierData.firstName, lastName = cashierData.lastName;
                newCreditTransaction = {
                  transactionId: _transactionsData.default[_transactionsData.default.length - 1].transactionId + 1,
                  accountNumber: accountNumber,
                  amount: amount,
                  cashier: "".concat(firstName, " ").concat(lastName),
                  transactionType: 'credit',
                  accountBalance: creditAccountBal,
                  createdOn: new Date().toLocaleString()
                };

                _transactionsData.default.push(newCreditTransaction);

                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Account has been successfully credited',
                  data: [newCreditTransaction]
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(422).json({
                  // 422 unprocessable entity
                  status: 422,
                  message: 'Transaction not completed'
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function creditAccount(_x, _x2) {
        return _creditAccount.apply(this, arguments);
      }

      return creditAccount;
    }()
  }]);

  return transaction;
}();

var _default = transaction;
exports.default = _default;