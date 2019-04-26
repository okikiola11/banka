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
  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(status, accountNumber) {
        var updatedOn, query, values, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                updatedOn = new Date().toLocaleString();
                query = "\n            UPDATE accounts SET status = $1, updatedon = $2 WHERE accountNumber = $3 RETURNING *\n        ";
                values = [status, updatedOn, accountNumber];
                _context4.next = 5;
                return _index.default.query(query, values);

              case 5:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows[0]);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateAccount(_x7, _x8) {
        return _updateAccount.apply(this, arguments);
      }

      return updateAccount;
    }()
  }, {
    key: "updateAccountBal",
    value: function () {
      var _updateAccountBal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(accountNumber, balance) {
        var updatedOn, query, values, _ref5, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                updatedOn = new Date().toLocaleString();
                query = "\n            UPDATE accounts SET balance = $1, updatedon = $2 WHERE accountnumber = $3 RETURNING *\n        ";
                values = [balance, updatedOn, accountNumber];
                _context5.next = 5;
                return _index.default.query(query, values);

              case 5:
                _ref5 = _context5.sent;
                rows = _ref5.rows;
                return _context5.abrupt("return", rows[0]);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateAccountBal(_x9, _x10) {
        return _updateAccountBal.apply(this, arguments);
      }

      return updateAccountBal;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(accountNumber) {
        var query, values, _ref6, rows;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                query = "\n            DELETE FROM accounts WHERE accountNumber = $1 RETURNING *;\n        ";
                values = [accountNumber];
                _context6.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref6 = _context6.sent;
                rows = _ref6.rows;
                return _context6.abrupt("return", rows[0]);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteAccount(_x11) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }, {
    key: "getDormantAccount",
    value: function () {
      var _getDormantAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var query, _ref7, rows;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                query = "\n            SELECT * FROM accounts WHERE status = 'dormant'\n        ";
                _context7.next = 3;
                return _index.default.queryPool(query);

              case 3:
                _ref7 = _context7.sent;
                rows = _ref7.rows;
                return _context7.abrupt("return", rows);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getDormantAccount() {
        return _getDormantAccount.apply(this, arguments);
      }

      return getDormantAccount;
    }()
  }, {
    key: "getActiveAccount",
    value: function () {
      var _getActiveAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var query, _ref8, rows;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                query = "\n            SELECT * FROM accounts WHERE status = 'active'\n        ";
                _context8.next = 3;
                return _index.default.queryPool(query);

              case 3:
                _ref8 = _context8.sent;
                rows = _ref8.rows;
                return _context8.abrupt("return", rows);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getActiveAccount() {
        return _getActiveAccount.apply(this, arguments);
      }

      return getActiveAccount;
    }()
  }, {
    key: "getDraftAccount",
    value: function () {
      var _getDraftAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        var query, _ref9, rows;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                query = "\n            SELECT * FROM accounts WHERE status = 'draft'\n        ";
                _context9.next = 3;
                return _index.default.queryPool(query);

              case 3:
                _ref9 = _context9.sent;
                rows = _ref9.rows;
                return _context9.abrupt("return", rows);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getDraftAccount() {
        return _getDraftAccount.apply(this, arguments);
      }

      return getDraftAccount;
    }()
  }, {
    key: "getClientAccounts",
    value: function () {
      var _getClientAccounts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(id) {
        var query, values, _ref10, rows;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                query = "\n            SELECT * FROM accounts WHERE ownerid = $1\n        ";
                values = [id];
                _context10.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref10 = _context10.sent;
                rows = _ref10.rows;
                return _context10.abrupt("return", rows);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function getClientAccounts(_x12) {
        return _getClientAccounts.apply(this, arguments);
      }

      return getClientAccounts;
    }()
  }, {
    key: "clientDraftAccount",
    value: function () {
      var _clientDraftAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(id) {
        var query, values, _ref11, rows;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                query = "\n            SELECT * FROM accounts WHERE ownerid = $1 AND status = $2\n        ";
                values = [id, 'draft'];
                _context11.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref11 = _context11.sent;
                rows = _ref11.rows;
                return _context11.abrupt("return", rows);

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function clientDraftAccount(_x13) {
        return _clientDraftAccount.apply(this, arguments);
      }

      return clientDraftAccount;
    }()
  }, {
    key: "clientActiveAccount",
    value: function () {
      var _clientActiveAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(id) {
        var query, values, _ref12, rows;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                query = "\n        SELECT * FROM accounts WHERE ownerid = $1 AND status = $2\n    ";
                values = [id, 'active'];
                _context12.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref12 = _context12.sent;
                rows = _ref12.rows;
                return _context12.abrupt("return", rows);

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function clientActiveAccount(_x14) {
        return _clientActiveAccount.apply(this, arguments);
      }

      return clientActiveAccount;
    }()
  }, {
    key: "clientDormantAccount",
    value: function () {
      var _clientDormantAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(id) {
        var query, values, _ref13, rows;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                query = "\n        SELECT * FROM accounts WHERE ownerid = $1 AND status = $2\n    ";
                values = [id, 'dormant'];
                _context13.next = 4;
                return _index.default.query(query, values);

              case 4:
                _ref13 = _context13.sent;
                rows = _ref13.rows;
                return _context13.abrupt("return", rows);

              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function clientDormantAccount(_x15) {
        return _clientDormantAccount.apply(this, arguments);
      }

      return clientDormantAccount;
    }()
  }]);

  return Accounts;
}();

var _default = Accounts;
exports.default = _default;