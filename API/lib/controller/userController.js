"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

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
        var _req$body, firstName, lastName, email, phone, gender, hashedPassword, newId, userType, user, payLoad, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, phone = _req$body.phone, gender = _req$body.gender;
                _context.next = 4;
                return _bcryptjs.default.hash(req.body.password, 8);

              case 4:
                hashedPassword = _context.sent;
                newId = _userData.default[_userData.default.length - 1].id + 1; // get the id of the newly created user

                userType = {
                  user: true,
                  admin: false,
                  staff: false
                };
                user = {
                  // new user to be created
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
                  newId: newId,
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

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'something went wrong while trying to create a user'
                }));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function signupUser(_x, _x2) {
        return _signupUser.apply(this, arguments);
      }

      return signupUser;
    }()
  }]);

  return userController;
}();

var _default = userController;
exports.default = _default;