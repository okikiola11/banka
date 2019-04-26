"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

var _transactionModel = _interopRequireDefault(require("../models/transactionModel"));

var _accountModel = _interopRequireDefault(require("../models/accountModel"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

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
        var errors, validateErrors, errArray, _req$body, amount, accountNumber, account, balance, creditAccountBal, transactionData, transactionid;

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
                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                _req$body = req.body, amount = _req$body.amount, accountNumber = _req$body.accountNumber;
                _context.next = 9;
                return _accountModel.default.getSingleAccount(accountNumber);

              case 9:
                account = _context.sent;

                if (account) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Account does not exist'
                }));

              case 12:
                balance = account.balance;
                creditAccountBal = parseFloat(+balance + +amount);
                _context.next = 16;
                return _accountModel.default.updateAccountBal(accountNumber, creditAccountBal);

              case 16:
                _context.next = 18;
                return _transactionModel.default.transact(accountNumber, amount, req.data.id, 'credit', creditAccountBal);

              case 18:
                transactionData = _context.sent;
                transactionid = transactionData.transactionid;
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Account has been successfully credited',
                  data: {
                    transactionId: transactionid,
                    accountNumber: accountNumber,
                    amount: amount,
                    cashier: req.data.id,
                    transactionType: 'credit',
                    accountBalance: creditAccountBal
                  }
                }));

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Something went wrong while trying to credit your account'
                }));

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23]]);
      }));

      function creditAccount(_x, _x2) {
        return _creditAccount.apply(this, arguments);
      }

      return creditAccount;
    }()
  }, {
    key: "debitAccount",
    value: function () {
      var _debitAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var errors, validateErrors, errArray, _req$body2, amount, accountNumber, account, balance, getBal, getAmount, newAccountBal, transactionData, transactionid;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context2.next = 6;
                  break;
                }

                validateErrors = errors.array();
                errArray = validateErrors.map(function (obj) {
                  var rObj = {};
                  rObj[obj.param] = obj.msg;
                  rObj.value = obj.value;
                  return rObj;
                });
                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                _req$body2 = req.body, amount = _req$body2.amount, accountNumber = _req$body2.accountNumber;
                _context2.next = 9;
                return _accountModel.default.getSingleAccount(accountNumber);

              case 9:
                account = _context2.sent;

                if (account) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Account does not exist'
                }));

              case 12:
                balance = account.balance;
                getBal = parseInt(balance, 10);
                getAmount = parseInt(amount, 10);

                if (!(getBal < getAmount)) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("return", res.status(409).json({
                  status: 409,
                  message: 'Insufficient funds for this transaction'
                }));

              case 17:
                newAccountBal = parseFloat(getBal - getAmount);
                _context2.next = 20;
                return _accountModel.default.updateAccountBal(accountNumber, newAccountBal);

              case 20:
                _context2.next = 22;
                return _transactionModel.default.transact(accountNumber, amount, req.data.id, 'debit', newAccountBal);

              case 22:
                transactionData = _context2.sent;
                transactionid = transactionData.transactionid;
                return _context2.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Account has been successfully debited',
                  data: {
                    transactionId: transactionid,
                    accountNumber: accountNumber,
                    amount: amount,
                    cashier: req.data.id,
                    transactionType: 'debit',
                    accountBalance: newAccountBal
                  }
                }));

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Something went wrong'
                }));

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 27]]);
      }));

      function debitAccount(_x3, _x4) {
        return _debitAccount.apply(this, arguments);
      }

      return debitAccount;
    }()
  }]);

  return transaction;
}();

var _default = transaction;
exports.default = _default;