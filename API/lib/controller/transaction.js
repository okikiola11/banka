"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transactionModel = _interopRequireDefault(require("../models/transactionModel"));

var _accountModel = _interopRequireDefault(require("../models/accountModel"));

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
        var amount, accountNumber, account, balance, creditAccountBal, transactionData, transactionid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                amount = req.body.amount;
                accountNumber = req.params.accountNumber;
                _context.next = 5;
                return _accountModel.default.getSingleAccount(accountNumber);

              case 5:
                account = _context.sent;

                if (account) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Account does not exist'
                }));

              case 8:
                balance = account.balance;
                creditAccountBal = parseFloat(+balance + +amount);
                _context.next = 12;
                return _accountModel.default.updateAccountBal(accountNumber, creditAccountBal);

              case 12:
                _context.next = 14;
                return _transactionModel.default.transact(accountNumber, amount, req.data.id, 'credit', creditAccountBal, balance);

              case 14:
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

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0.stack);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Something went wrong while trying to credit your account'
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
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
        var amount, accountNumber, account, balance, getBal, getAmount, newAccountBal, transactionData, transactionid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                amount = req.body.amount;
                accountNumber = req.params.accountNumber;
                _context2.next = 5;
                return _accountModel.default.getSingleAccount(accountNumber);

              case 5:
                account = _context2.sent;

                if (account) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Account does not exist'
                }));

              case 8:
                balance = account.balance;
                getBal = parseInt(balance, 10);
                getAmount = parseInt(amount, 10);

                if (!(getBal < getAmount)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", res.status(409).json({
                  status: 409,
                  message: 'Insufficient funds for this transaction'
                }));

              case 13:
                newAccountBal = parseFloat(getBal - getAmount);
                _context2.next = 16;
                return _accountModel.default.updateAccountBal(accountNumber, newAccountBal);

              case 16:
                _context2.next = 18;
                return _transactionModel.default.transact(accountNumber, amount, req.data.id, 'debit', balance, newAccountBal);

              case 18:
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

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Something went wrong while trying to debit your account'
                }));

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 23]]);
      }));

      function debitAccount(_x3, _x4) {
        return _debitAccount.apply(this, arguments);
      }

      return debitAccount;
    }()
  }, {
    key: "getSingleTransactions",
    value: function () {
      var _getSingleTransactions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var transactionId, allTransaction, transactionid, amount, transactiontype, newbalance, oldbalance, createdon, accountnumber;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                transactionId = req.params.transactionId;
                _context3.next = 4;
                return _transactionModel.default.getSingleTransactions(transactionId);

              case 4:
                allTransaction = _context3.sent;

                if (allTransaction) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'No account transaction found'
                }));

              case 7:
                transactionid = allTransaction.transactionid, amount = allTransaction.amount, transactiontype = allTransaction.transactiontype, newbalance = allTransaction.newbalance, oldbalance = allTransaction.oldbalance, createdon = allTransaction.createdon, accountnumber = allTransaction.accountnumber;
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Transaction has been successfully retrieved',
                  data: {
                    transactionId: transactionid,
                    createdOn: createdon,
                    type: transactiontype,
                    accountNumber: accountnumber,
                    amount: amount,
                    oldBalance: oldbalance,
                    newBalance: newbalance
                  }
                }));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Something went wrong while trying to retrieve all accounts'
                }));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function getSingleTransactions(_x5, _x6) {
        return _getSingleTransactions.apply(this, arguments);
      }

      return getSingleTransactions;
    }()
  }]);

  return transaction;
}();

var _default = transaction;
exports.default = _default;