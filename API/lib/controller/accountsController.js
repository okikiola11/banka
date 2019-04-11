"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

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
        var errors, validateErrors, errArray, _req$body, accountNumber, type, openingBalance, accountBalance, userInfo, id, newlyCreatedAcct;

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
                _req$body = req.body, accountNumber = _req$body.accountNumber, type = _req$body.type, openingBalance = _req$body.openingBalance, accountBalance = _req$body.accountBalance;
                userInfo = _userData.default.find(function (details) {
                  return details.id === req.data.id;
                });
                id = userInfo.id;
                console.log(id);
                newlyCreatedAcct = {
                  id: _accountsData.default[_accountsData.default.length - 1].id + 1,
                  ownerId: id,
                  accountNumber: accountNumber,
                  type: type,
                  openingBalance: openingBalance,
                  acctStatus: 'active',
                  accountBalance: accountBalance,
                  createdOn: new Date().toLocaleString()
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
  }]);

  return accountsController;
}();

var _default = accountsController;
exports.default = _default;