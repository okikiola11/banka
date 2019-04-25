"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(0, _dotenv.config)();

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
          type = _ref.type,
          isadmin = _ref.isadmin;
      console.log(id, type, isadmin);
      console.log('hello world');
      return _jsonwebtoken.default.sign({
        id: id,
        type: type,
        isadmin: isadmin
      }, process.env.secret, {
        expiresIn: '24h' // expires in 24hours

      });
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      // Get the auth header value bcos the token should be sent in the header as the Authorization value
      var bearerHeader = req.headers.authorization;

      _jsonwebtoken.default.verify(bearerHeader, process.env.secret, function (err, authData) {
        if (err) {
          return res.sendStatus(403);
        }

        var id = authData.id,
            type = authData.type,
            isadmin = authData.isadmin;
        req.data = {
          id: id,
          type: type,
          isadmin: isadmin
        };
        next();
      });
    }
  }]);

  return authMiddleware;
}();

var _default = authMiddleware;
exports.default = _default;