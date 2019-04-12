"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var authorize =
/*#__PURE__*/
function () {
  function authorize() {
    _classCallCheck(this, authorize);
  }

  _createClass(authorize, null, [{
    key: "createAccountAuth",
    value: function createAccountAuth(req, res, next) {
      if (!req.data.userType.user) {
        return res.status(403).json({
          status: 403,
          message: 'Access denied'
        });
      }

      next();
    }
  }]);

  return authorize;
}();

var _default = authorize;
exports.default = _default;