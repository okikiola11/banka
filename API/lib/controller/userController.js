"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signupUser",
    value: function () {
      var _signupUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, firstName, lastName, email, type, isadmin, accountType, isAdmin, member, hashedPassword, client, id, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, type = _req$body.type, isadmin = _req$body.isadmin;

                // get isadmin type
                if (type === undefined) {
                  accountType = 'client';
                } else {
                  accountType = type;
                }

                if (isadmin === undefined) {
                  isAdmin = false;
                } else {
                  isAdmin = true;
                }

                _context.next = 6;
                return _userModel.default.findByEmail(email);

              case 6:
                member = _context.sent;

                if (!member) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.status(409).json({
                  status: 409,
                  message: 'Email already exist'
                }));

              case 9:
                _context.next = 11;
                return _bcryptjs.default.hash(req.body.password, 8);

              case 11:
                hashedPassword = _context.sent;
                _context.next = 14;
                return _userModel.default.SaveClient(firstName, lastName, email, hashedPassword, accountType, isAdmin);

              case 14:
                client = _context.sent;

                /* new user to be created */
                id = client.id;
                token = _authMiddleware.default.generateToken({
                  id: id,
                  type: accountType,
                  isadmin: isAdmin
                });
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'New User has been created',
                  data: [{
                    id: id,
                    token: token,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                  }]
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'something went wrong while trying to create a user'
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function signupUser(_x, _x2) {
        return _signupUser.apply(this, arguments);
      }

      return signupUser;
    }()
  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, client, passwordIsValid, id, type, isadmin, firstname, lastname, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return _userModel.default.findByEmail(email);

              case 4:
                client = _context2.sent;

                if (client) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'User not found'
                }));

              case 7:
                _context2.next = 9;
                return _bcryptjs.default.compare(password, client.password);

              case 9:
                passwordIsValid = _context2.sent;

                if (passwordIsValid) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", res.status(403).json({
                  status: 403,
                  auth: 'false',
                  message: 'Incorrect Password'
                }));

              case 12:
                id = client.id, type = client.type, isadmin = client.isadmin, firstname = client.firstname, lastname = client.lastname;
                token = _authMiddleware.default.generateToken({
                  id: id,
                  isadmin: isadmin,
                  type: type
                });
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "Welcome ".concat(email, ", you have successfully logged in"),
                  data: {
                    id: id,
                    token: token,
                    firstName: firstname,
                    lastName: lastname,
                    email: email
                  }
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'User record does not exist'
                }));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports.default = _default;