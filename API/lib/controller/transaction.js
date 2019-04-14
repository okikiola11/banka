'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;

let _check = require('express-validator/check');

let _transactionsData = _interopRequireDefault(require('../utils/transactionsData'));

let _accountsData = _interopRequireDefault(require('../utils/accountsData'));

let _userData = _interopRequireDefault(require('../utils/userData'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj,
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
        let descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

let transaction =
  /* #__PURE__*/
  (function () {
    function transaction() {
      _classCallCheck(this, transaction);
    }

    _createClass(transaction, null, [{
      key: "debitAccount",
      value: function debitAccount(req, res) {
        try {
          var errors = (0, _check.validationResult)(req);

          if (!errors.isEmpty()) {
            var validateErrors = errors.array();
            var errArray = validateErrors.map(function (obj) {
              var rObj = {};
              rObj[obj.param] = obj.msg;
              rObj.value = obj.value;
              return rObj;
            });
            return res.status(401).json({
              status: 401,
              error: 'Validation failed, check errors property for more details',
              errors: errArray
            });
          }

          var _req$body = req.body,
            amount = _req$body.amount,
            accountNumber = _req$body.accountNumber;

          var Account = _accountsData.default.find(function (account) {
            return account.accountNumber === accountNumber;
          }); // get accountNumber from the list of account


          var accountIndex = _accountsData.default.indexOf(Account);

          if (Account === undefined) {
            // if acct does not exist
            return res.status(404).json({
              status: 404,
              message: 'Account does not exist'
            });
          }

          var accountBalance = Account.accountBalance;
          var getBal = parseInt(accountBalance, 10);
          var getAmount = parseInt(amount, 10);

          if (getBal < getAmount) {
            return res.status(409).json({
              status: 409,
              message: 'Insufficient funds for this transaction'
            });
          }

          var newAccountBal = parseFloat(accountBalance - amount);
          Account.accountBalance = newAccountBal;

          _accountsData.default.splice(accountIndex, 1, Account); // replaces 1 element(cuts off) at 1th index


          var cashierData = _userData.default.find(function (details) {
            return details.id === req.data.id;
          });

          var firstName = cashierData.firstName,
            lastName = cashierData.lastName;
          var newTransaction = {
            transactionId: _transactionsData.default[_transactionsData.default.length - 1].transactionId + 1,
            accountNumber: accountNumber,
            amount: amount,
            cashier: "".concat(firstName, " ").concat(lastName),
            transactionType: 'debit',
            accountBalance: newAccountBal,
            createdOn: new Date().toLocaleString()
          };

          _transactionsData.default.push(newTransaction);

          return res.status(201).json({
            status: 201,
            message: 'Account has been debited successfully',
            data: [newTransaction]
          });
        } catch (error) {
          return res.status(422).json({
            status: 422,
            error: 'Transaction failed'
          });
        }
      }
    }]);

    return transaction;
  }());

let _default = transaction;
exports.default = _default;
