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

var User =
/*#__PURE__*/
function () {
  function User(firstName, lastName, email, password, type, isAdmin) {
    _classCallCheck(this, User);

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.type = type;
    this.isAdmin = isAdmin;
  }

  _createClass(User, null, [{
    key: "SaveClient",
    value: function () {
      var _SaveClient = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(firstName, lastName, email, password) {
        var query, values, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "INSERT INTO\n            users(firstName, lastName, email, password)\n            VALUES($1, $2, $3, $4)\n            returning *";
                values = [firstName, lastName, email, password];
                _context.next = 4;
                return _index.default.query(query, values);

              case 4:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function SaveClient(_x, _x2, _x3, _x4) {
        return _SaveClient.apply(this, arguments);
      }

      return SaveClient;
    }() // static async findByEmail(email) {
    //     console.log('ayobsfggh is male');
    //     const query = `
    //         SELECT * FROM users WHERE email = $1
    //     `;
    //     // const values = [email];
    //     const result = await db.query(query);
    //     console.log(result);
    //     console.log('ayobsfggh');
    //     return result;
    // }

  }]);

  return User;
}();

var _default = User;
exports.default = _default;