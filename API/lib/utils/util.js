"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqueRandom = _interopRequireDefault(require("unique-random"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _accountsData = _interopRequireDefault(require("./accountsData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Utility =
/*#__PURE__*/
function () {
  function Utility() {
    _classCallCheck(this, Utility);
  }

  _createClass(Utility, null, [{
    key: "acctNumberGen",
    value: function acctNumberGen() {
      var rand = (0, _uniqueRandom.default)(1000000000, 9999999999);
      var accountNo = rand();
      var isUniqueAcct = false;

      while (!isUniqueAcct) {
        var checkAccountNo = _accountsData.default.find(function (checkacct) {
          return checkacct.accountNumber === accountNo;
        });

        if (checkAccountNo) {
          accountNo = rand();
        } else {
          isUniqueAcct = true;
        }
      }

      return accountNo;
    }
  }, {
    key: "generateToken",
    value: function generateToken(payload) {
      return _jsonwebtoken.default.sign(payload, process.env.secret, {
        expiresIn: '24h'
      });
    }
  }, {
    key: "decodeToken",
    value: function decodeToken(token) {
      return _jsonwebtoken.default.verify(token, process.env.secret);
    }
  }]);

  return Utility;
}();

var _default = Utility;
exports.default = _default;