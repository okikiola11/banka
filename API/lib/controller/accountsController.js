"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

var _util = _interopRequireDefault(require("../utils/util"));

var _userData = _interopRequireDefault(require("../utils/userData"));

var _accountsData = _interopRequireDefault(require("../utils/accountsData"));

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
        var errors, validateErrors, errArray, _req$body, type, openingBalance, userInfo, id, accountNumber, newlyCreatedAcct;

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
                _req$body = req.body, type = _req$body.type, openingBalance = _req$body.openingBalance;
                userInfo = _userData.default.find(function (details) {
                  return details.id === req.data.id;
                });
                id = userInfo.id; // get owner Id from User table

                accountNumber = _util.default.acctNumberGen();
                newlyCreatedAcct = {
                  id: _accountsData.default[_accountsData.default.length - 1].id + 1,
                  ownerId: id,
                  accountNumber: accountNumber,
                  type: type,
                  openingBalance: openingBalance,
                  acctStatus: 'active',
                  accountBalance: openingBalance,
                  createdOn: new Date().toLocaleString(),
                  updatedOn: null
                };

                _accountsData.default.push(newlyCreatedAcct);

                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Account has been created',
                  data: [newlyCreatedAcct]
                }));

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'something went wrong while trying to create an account'
                }));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15]]);
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
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all accounts',
                  data: _accountsData.default
                }));

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'No account record found'
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 4]]);
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
        var accountNumber, singleAcct;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                accountNumber = req.params.accountNumber;
                _context3.next = 4;
                return _accountsData.default.find(function (singleData) {
                  return singleData.accountNumber === accountNumber;
                });

              case 4:
                singleAcct = _context3.sent;

                if (!(singleAcct === undefined)) {
                  _context3.next = 7;
                  break;
                }

                throw new Error('Account does not exist');

              case 7:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Account has been successfully retrieved',
                  data: [singleAcct]
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Account does not exist'
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
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
        var errors, validateErrors, errArray, accountNumber, AccountNo, id, ownerId, type, openBalance, accountBalance, createdOn, updatedOn, acctStatus, updatedAccount;
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
                return _context4.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                accountNumber = req.params.accountNumber;
                AccountNo = _accountsData.default.find(function (acc) {
                  return acc.accountNumber === accountNumber;
                });

                if (AccountNo) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Account Number not found'
                }));

              case 10:
                id = AccountNo.id, ownerId = AccountNo.ownerId, type = AccountNo.type, openBalance = AccountNo.openBalance, accountBalance = AccountNo.accountBalance, createdOn = AccountNo.createdOn;
                updatedOn = new Date().toLocaleString();
                acctStatus = req.body.acctStatus;
                updatedAccount = {
                  id: id,
                  ownerId: ownerId,
                  accountNumber: accountNumber,
                  type: type,
                  acctStatus: acctStatus,
                  openBalance: openBalance,
                  accountBalance: accountBalance,
                  createdOn: createdOn,
                  updatedOn: updatedOn
                };

                _accountsData.default.splice(_accountsData.default.indexOf(AccountNo), 1, updatedAccount);

                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Account has been succesfully updated',
                  data: [{
                    id: id,
                    type: type,
                    accountNumber: accountNumber,
                    acctStatus: acctStatus,
                    updatedOn: updatedOn
                  }]
                }));

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  status: 500,
                  // 500 no available content
                  error: 'Something went wrong while trying to update your account'
                }));

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 18]]);
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
                return _accountsData.default.find(function (deletedData) {
                  return deletedData.accountNumber === accountNumber;
                });

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
                _accountsData.default.splice(deletedAccount);

                return _context5.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Account has been deleted successfully'
                }));

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).send({
                  status: '500',
                  error: 'Something went wrong while trying to delete, try again'
                }));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
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