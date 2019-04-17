"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _check = require("express-validator/check");

var _userData = _interopRequireDefault(require("../utils/userData"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signupUser",
    value: function () {
      var _signupUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var errors, validateErrors, errArray, _req$body, firstName, lastName, email, phone, gender, hashedPassword, newId, userType, user, payLoad, token;

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
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, phone = _req$body.phone, gender = _req$body.gender;
                _context.next = 9;
                return _bcryptjs.default.hash(req.body.password, 8);

              case 9:
                hashedPassword = _context.sent;
                newId = _userData.default[_userData.default.length - 1].id + 1; // get the id of the newly created user

                userType = {
                  user: true,
                  admin: false,
                  staff: false
                };
                /* new user to be created */

                user = {
                  id: newId,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phone: phone,
                  gender: gender,
                  password: hashedPassword,
                  userType: userType
                };

                _userData.default.push(user);

                payLoad = {
                  newId: newId,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phone: phone,
                  gender: gender,
                  userType: userType
                };
                token = _authMiddleware.default.generateToken({
                  id: newId,
                  userType: userType
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

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'something went wrong while trying to create a user'
                }));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
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
        var errors, validateErrors, errArray, _req$body2, email, password, user, passwordIsValid, id, userType, firstName, newId, lastName, token, payLoad;

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
                return _context2.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Validation failed, check errors property for more details',
                  errors: errArray
                }));

              case 6:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                user = _userData.default.find(function (member) {
                  return member.email === email;
                });

                if (user) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.status(404).send('No user found.'));

              case 10:
                _context2.next = 12;
                return _bcryptjs.default.compare(password, user.password);

              case 12:
                passwordIsValid = _context2.sent;

                if (passwordIsValid) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  status: 401,
                  auth: 'false',
                  message: 'Incorrect Password'
                }));

              case 15:
                id = user.id, userType = user.userType, firstName = user.firstName, newId = user.newId, lastName = user.lastName;
                token = _authMiddleware.default.generateToken({
                  id: id,
                  userType: userType
                });
                payLoad = {
                  newId: newId,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  userType: userType
                };
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "Welcome ".concat(user.email, ", you have successfully logged in"),
                  data: [{
                    auth: 'true',
                    token: token,
                    payLoad: payLoad
                  }]
                }));

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'User record does not exist'
                }));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 21]]);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);

  return userController;
}();

var _default = userController;
exports.default = _default;