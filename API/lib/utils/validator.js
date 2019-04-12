"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("express-validator/check");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: "getValidationResult",
    value: function getValidationResult(req, res) {
      var errors = (0, _check.validationResult)(req);

      if (!errors.isEmpty()) {
        var validateErrors = errors.array();
        var errArray = validateErrors.map(function (obj) {
          var rObj = {};
          rObj[obj.param] = obj.msg;
          rObj.value = obj.value;
          return rObj;
        });
        return res.status(401).json({
          status: 401,
          error: 'Validation failed, check errors property for more details',
          errors: errArray
        });
      }

      return res.status(201).json({
        status: 201,
        message: 'Welcome, you have successfully logged in'
      });
    }
  }, {
    key: "validateSignUp",
    value: function validateSignUp() {
      return [(0, _check.body)('firstName').isAlpha().withMessage('You should enter only alphabet').exists().withMessage('Field cannot be empty'), (0, _check.body)('lastName').isAlpha().withMessage('You should enter only alphabet').exists().withMessage('Field cannot be empty'), (0, _check.body)('email').isEmail().withMessage('Should be a valid email').exists().withMessage('Field cannot be empty'), (0, _check.body)('phone').isNumeric().withMessage('You should enter only numeric').exists().withMessage('Field cannot be empty'), (0, _check.body)('gender').isIn(['male', 'female']).withMessage('Choose a gender').exists().withMessage('Field cannot be empty'), (0, _check.body)('password').isAlphanumeric().withMessage('You should enter only alphanumeric').isLength({
        min: 5
      }).withMessage('Should be atleast 5 characters').exists().withMessage('Field cannot be empty')];
    }
  }, {
    key: "validateLogin",
    value: function validateLogin() {
      return [(0, _check.body)('email').isEmail().withMessage('Should be a valid email').exists().withMessage('Field cannot be empty'), (0, _check.body)('password').isAlphanumeric().withMessage('You should enter only alphanumeric').isLength({
        min: 5
      }).withMessage('Should be atleast 5 characters').exists().withMessage('Field cannot be empty')];
    }
  }, {
    key: "validateAccount",
    value: function validateAccount() {
      return [(0, _check.body)('type').isIn(['savings', 'current']).withMessage('Choose a valid account type').exists().withMessage('Field cannot be empty'), (0, _check.body)('openingBalance').isDecimal().withMessage('You should enter only decimal').exists().withMessage('Field cannot be empty')];
    }
  }]);

  return Validation;
}();

var _default = Validation;
exports.default = _default;