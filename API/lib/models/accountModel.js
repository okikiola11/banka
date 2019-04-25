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

var Accounts =
/*#__PURE__*/
function () {
  function Accounts() {
    _classCallCheck(this, Accounts);
  }

  _createClass(Accounts, null, [{
    key: "SaveAccount",
    value: function () {
      var _SaveAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(accountNumber, ownerid, status, balance, type) {
        var query, values, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            INSERT INTO\n            accounts(accountNumber, ownerid, status, balance, type)\n            VALUES ($1, $2, $3, $4, $5)\n            returning *\n        ";
                values = [accountNumber, ownerid, status, balance, type];
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

      function SaveAccount(_x, _x2, _x3, _x4, _x5) {
        return _SaveAccount.apply(this, arguments);
      }

      return SaveAccount;
    }()
  }, {
    key: "getAllAccounts",
    value: function () {
      var _getAllAccounts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var query, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n            SELECT * FROM accounts\n        ";
                _context2.next = 3;
                return _index.default.queryPool(query);

              case 3:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllAccounts() {
        return _getAllAccounts.apply(this, arguments);
      }

      return getAllAccounts;
    }()
  }, {
    key: "getSingleAccount",
    value: function () {
      var _getSingleAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(accountNumber) {
        var query, values, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n            SELECT * FROM accounts WHERE accountnumber = $1\n        ";
                values = [accountNumber];
                _context3.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows[0]);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getSingleAccount(_x6) {
        return _getSingleAccount.apply(this, arguments);
      }

      return getSingleAccount;
    }()
  }]);

  return Accounts;
}();

var _default = Accounts;
exports.default = _default;