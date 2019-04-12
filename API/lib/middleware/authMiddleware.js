"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authMiddleware =
/*#__PURE__*/
function () {
  function authMiddleware() {
    _classCallCheck(this, authMiddleware);
  }

  _createClass(authMiddleware, null, [{
    key: "generateToken",
    // FORMAT OF TOKEN
    // Authorization: <access_token>
    value: function generateToken(_ref) {
      var id = _ref.id,
          userType = _ref.userType;
      return _jsonwebtoken.default.sign({
        id: id,
        userType: userType
      }, _config.default.secret, {
        expiresIn: 86400 // expires in 24hours

      });
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      // Get the auth header value bcos the token should be sent in the header as the Authorization value
      var bearerHeader = req.headers.authorization;

      _jsonwebtoken.default.verify(bearerHeader, _config.default.secret, function (err, authData) {
        if (err) {
          return res.sendStatus(403);
        }

        var id = authData.id,
            userType = authData.userType;
        req.data = {
          id: id,
          userType: userType
        };
        next();
      });
    }
  }]);

  return authMiddleware;
}();

var _default = authMiddleware;
exports.default = _default;