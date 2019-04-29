"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validate =
/*#__PURE__*/
function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, null, [{
    key: "validateResult",
    value: function validateResult(req, res, next) {
      var errors = (0, _check.validationResult)(req);

      if (!errors.isEmpty()) {
        var validateErrors = errors.array();
        var errArray = validateErrors.map(function (obj) {
          var rObj = {};
          rObj[obj.param] = obj.msg;
          rObj.value = obj.value;
          return rObj;
        });
        return res.status(400).json({
          status: 400,
          error: 'Validation failed, check errors property for more details',
          errors: errArray
        });
      }

      return next();
    }
  }]);

  return Validate;
}();

var _default = Validate;
exports.default = _default;