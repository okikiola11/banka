"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _accountModel = _interopRequireDefault(require("../models/accountModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authorize =
/*#__PURE__*/
function () {
  function authorize() {
    _classCallCheck(this, authorize);
  }

  _createClass(authorize, null, [{
    key: "authTransaction",
    value: function authTransaction(req, res, next) {
      if (!req.data.type === 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Access denied'
        });
      }

      next();
    }
  }, {
    key: "clientAccount",
    value: function () {
      var _clientAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var isQuery, status, _accounts, _accounts2, _accounts3, accounts;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(req.data.type === 'client')) {
                  _context.next = 31;
                  break;
                }

                isQuery = Object.keys(req.query).length;

                if (!isQuery) {
                  _context.next = 25;
                  break;
                }

                status = req.query.status;

                if (!(status === 'dormant')) {
                  _context.next = 11;
                  break;
                }

                _context.next = 7;
                return _accountModel.default.clientDormantAccount(req.data.id);

              case 7:
                _accounts = _context.sent;

                if (!(_accounts.length === 0)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing dormant account',
                  data: _accounts
                }));

              case 10:
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all dormant accounts',
                  data: _accounts
                }));

              case 11:
                if (!(status === 'active')) {
                  _context.next = 18;
                  break;
                }

                _context.next = 14;
                return _accountModel.default.clientActiveAccount(req.data.id);

              case 14:
                _accounts2 = _context.sent;

                if (!(_accounts2.length === 0)) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing active account',
                  data: _accounts2
                }));

              case 17:
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all active accounts',
                  data: _accounts2
                }));

              case 18:
                if (!(status === 'draft')) {
                  _context.next = 25;
                  break;
                }

                _context.next = 21;
                return _accountModel.default.clientDraftAccount(req.data.id);

              case 21:
                _accounts3 = _context.sent;

                if (!(_accounts3.length === 0)) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing draft account',
                  data: _accounts3
                }));

              case 24:
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all draft accounts',
                  data: _accounts3
                }));

              case 25:
                _context.next = 27;
                return _accountModel.default.getClientAccounts(req.data.id);

              case 27:
                accounts = _context.sent;

                if (!(accounts.length === 0)) {
                  _context.next = 30;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'There are no existing account',
                  data: accounts
                }));

              case 30:
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successfully retrieved all accounts',
                  data: accounts
                }));

              case 31:
                return _context.abrupt("return", next());

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function clientAccount(_x, _x2, _x3) {
        return _clientAccount.apply(this, arguments);
      }

      return clientAccount;
    }()
  }, {
    key: "createAccountAuth",
    value: function createAccountAuth(req, res, next) {
      if (req.data.isAdmin === 'true') {
        return res.status(403).json({
          status: 403,
          message: 'Access denied'
        });
      }

      next();
    }
  }, {
    key: "viewAccountAuth",
    value: function viewAccountAuth(req, res, next) {
      // access to both admin&staff
      if (req.data.type === 'client') {
        return res.status(403).json({
          status: 403,
          message: 'Access denied'
        });
      }

      next();
    }
  }]);

  return authorize;
}();

var _default = authorize;
exports.default = _default;