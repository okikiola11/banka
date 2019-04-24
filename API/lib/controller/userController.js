"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _check = require("express-validator/check");

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
        var errors, validateErrors, errArray, _req$body, firstName, lastName, email, hashedPassword, userData, client, _client$rows, user, id, type, isadmin, payLoad, token;

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
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email;
                console.log(req.body);
                _context.next = 10;
                return _bcryptjs.default.hash(req.body.password, 8);

              case 10:
                hashedPassword = _context.sent;
                _context.next = 13;
                return _userModel.default.findByEmail(email);

              case 13:
                userData = _context.sent;

                if (!(userData.name === 'error')) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", res.status(409).json({
                  status: 409,
                  message: 'User email already exist'
                }));

              case 16:
                _context.next = 18;
                return _userModel.default.SaveClient(firstName, lastName, email, hashedPassword);

              case 18:
                client = _context.sent;

                /* new user to be created */
                _client$rows = _slicedToArray(client.rows, 1), user = _client$rows[0];
                id = user.id, type = user.type, isadmin = user.isadmin;
                payLoad = {
                  id: id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  type: type,
                  isadmin: isadmin
                };
                token = _authMiddleware.default.generateToken({
                  id: id,
                  type: type,
                  isadmin: isadmin
                });
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'New User has been created',
                  data: [{
                    auth: 'true',
                    token: token,
                    payLoad: payLoad
                  }]
                }));

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'something went wrong while trying to create a user'
                }));

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 26]]);
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
        var errors, validateErrors, errArray, _req$body2, email, password, text, _ref, rows, passwordIsValid, id, isadmin, firstName, lastName, token, payLoad;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context2.next = 6;
                  break;
                }

                validateErrors = errors.array();
                errArray = validateErrors.map(function (obj) {
                  var rObj = {};
                  rObj[obj.param] = obj.msg;
                  rObj.value = obj.value;
                  return rObj;
                });
                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // const user = User.find(member => member.email === email);
                // if (!user) {
                //     return res.status(404).send('No user found.');
                // }

                text = "\n                SELECT * FROM users WHERE email = $1\n            ";
                _context2.next = 10;
                return _db.default.query(text, email);

              case 10:
                _ref = _context2.sent;
                rows = _ref.rows;

                if (rows[0]) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'User not found'
                }));

              case 14:
                _context2.next = 16;
                return _bcryptjs.default.compare(password, _userModel.default.password);

              case 16:
                passwordIsValid = _context2.sent;

                if (passwordIsValid) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  auth: 'false',
                  message: 'Incorrect Password'
                }));

              case 19:
                id = rows.id, isadmin = rows.isadmin, firstName = rows.firstName, lastName = rows.lastName;
                token = _authMiddleware.default.generateToken({
                  id: id,
                  isadmin: isadmin
                });
                payLoad = {
                  id: id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  isadmin: isadmin
                };
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "Welcome ".concat(rows.email, ", you have successfully logged in"),
                  data: [{
                    auth: 'true',
                    token: token,
                    payLoad: payLoad
                  }]
                }));

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'User record does not exist'
                }));

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 25]]);
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