"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

var _util = _interopRequireDefault(require("../utils/util"));

var _accountModel = _interopRequireDefault(require("../models/accountModel"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var accountsController =
/*#__PURE__*/
function () {
  function accountsController() {
    _classCallCheck(this, accountsController);
  }

  _createClass(accountsController, null, [{
    key: "createAccount",
    value: function () {
      var _createAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var errors, validateErrors, errArray, type, accountNumber, id, newAccount, balance, userData, firstname, lastname, email;
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
                type = req.body.type;
                accountNumber = _util.default.acctNumberGen();
                id = req.data.id; // get owner Id from User table

                _context.next = 11;
                return _accountModel.default.SaveAccount(accountNumber, id, 'draft', parseFloat(0), type);

              case 11:
                newAccount = _context.sent;
                balance = newAccount.balance;
                _context.next = 15;
                return _userModel.default.findById(id);

              case 15:
                userData = _context.sent;
                firstname = userData.firstname, lastname = userData.lastname, email = userData.email;
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Account has been created',
                  data: {
                    accountNumber: accountNumber,
                    firstName: firstname,
                    // account owner first name
                    lastName: lastname,
                    // account owner last name
                    email: email,
                    // account owner email
                    type: type,
                    openBalance: balance
                  }
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'something went wrong while trying to create an account'
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }, {
    key: "getAllAccount",
    value: function () {
      var _getAllAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var isQuery, status, _accounts, _accounts2, _accounts3, accounts;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                isQuery = Object.keys(req.query).length;

                if (!isQuery) {
                  _context2.next = 25;
                  break;
                }

                status = req.query.status;

                if (!(status === 'dormant')) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 7;
                return _accountModel.default.getDormantAccount();

              case 7:
                _accounts = _context2.sent;

                if (!(_accounts.length === 0)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing dormant account',
                  data: _accounts
                }));

              case 10:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all dormant accounts',
                  data: _accounts
                }));

              case 11:
                if (!(status === 'active')) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 14;
                return _accountModel.default.getActiveAccount();

              case 14:
                _accounts2 = _context2.sent;

                if (!(_accounts2.length === 0)) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing active account',
                  data: _accounts2
                }));

              case 17:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all active accounts',
                  data: _accounts2
                }));

              case 18:
                if (!(status === 'draft')) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 21;
                return _accountModel.default.getDraftAccount();

              case 21:
                _accounts3 = _context2.sent;

                if (!(_accounts3.length === 0)) {
                  _context2.next = 24;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing draft account',
                  data: _accounts3
                }));

              case 24:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all draft accounts',
                  data: _accounts3
                }));

              case 25:
                _context2.next = 27;
                return _accountModel.default.getAllAccounts();

              case 27:
                accounts = _context2.sent;

                if (!(accounts.length === 0)) {
                  _context2.next = 30;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing account',
                  data: accounts
                }));

              case 30:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all accounts',
                  data: accounts
                }));

              case 33:
                _context2.prev = 33;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Something went wrong while trying to retrieve all accounts'
                }));

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 33]]);
      }));

      function getAllAccount(_x3, _x4) {
        return _getAllAccount.apply(this, arguments);
      }

      return getAllAccount;
    }()
  }, {
    key: "getSingleAccount",
    value: function () {
      var _getSingleAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var accountNumber, account, ownerid;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                accountNumber = req.params.accountNumber;
                _context3.next = 4;
                return _accountModel.default.getSingleAccount(accountNumber);

              case 4:
                account = _context3.sent;

                if (account) {
                  _context3.next = 7;
                  break;
                }

                throw new Error('Account does not exist');

              case 7:
                ownerid = account.ownerid; // check if user is actually the acct owner

                if (!(ownerid !== req.data.id && req.data.type === 'client')) {
                  _context3.next = 10;
                  break;
                }

                throw new Error('Unauthorized');

              case 10:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Account has been successfully retrieved',
                  data: [account]
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);

                if (!(_context3.t0.message === 'Account does not exist')) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Account does not exist'
                }));

              case 17:
                if (!(_context3.t0.message === 'Unauthorized')) {
                  _context3.next = 19;
                  break;
                }

                return _context3.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'This account does not belong to you'
                }));

              case 19:
                return _context3.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Something went wrong while trying to retrieve account'
                }));

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));

      function getSingleAccount(_x5, _x6) {
        return _getSingleAccount.apply(this, arguments);
      }

      return getSingleAccount;
    }()
  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var errors, validateErrors, errArray, status, accountNumber, account;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context4.next = 6;
                  break;
                }

                validateErrors = errors.array();
                errArray = validateErrors.map(function (obj) {
                  var rObj = {};
                  rObj[obj.param] = obj.msg;
                  rObj.value = obj.value;
                  return rObj;
                });
                return _context4.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                status = req.body.status;
                accountNumber = req.params.accountNumber;
                _context4.next = 10;
                return _accountModel.default.updateAccount(status, accountNumber);

              case 10:
                account = _context4.sent;

                if (account) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Account Number not found'
                }));

              case 13:
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Account has been succesfully updated',
                  data: [{
                    accountNumber: accountNumber,
                    status: status
                  }]
                }));

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  status: 500,
                  // 500 no available content
                  error: 'Something went wrong while trying to update your account'
                }));

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 16]]);
      }));

      function updateAccount(_x7, _x8) {
        return _updateAccount.apply(this, arguments);
      }

      return updateAccount;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var accountNumber, deletedAccount;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                accountNumber = req.params.accountNumber;
                _context5.next = 4;
                return _accountModel.default.deleteAccount(accountNumber);

              case 4:
                deletedAccount = _context5.sent;

                if (deletedAccount) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Oooops! no record with such Account number'
                }));

              case 7:
                return _context5.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Account has been deleted successfully'
                }));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).send({
                  status: '500',
                  error: 'Something went wrong while trying to delete, try again'
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      function deleteAccount(_x9, _x10) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }]);

  return accountsController;
}();

var _default = accountsController;
exports.default = _default;