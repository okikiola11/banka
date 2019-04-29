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
    key: "validateSignUp",
    value: function validateSignUp() {
      return [(0, _check.body)('firstName').isAlpha().withMessage('You should enter only alphabet').exists().withMessage('Field cannot be empty'), (0, _check.body)('lastName').isAlpha().withMessage('You should enter only alphabet').exists().withMessage('Field cannot be empty'), (0, _check.body)('email').isEmail().withMessage('Should be a valid email').exists().withMessage('Field cannot be empty'), (0, _check.body)('password').isAlphanumeric().withMessage('You should enter only alphanumeric').isLength({
        min: 5
      }).withMessage('Should be atleast 5 characters').exists().withMessage('Field cannot be empty')];
    }
  }, {
    key: "validateUser",
    value: function validateUser() {
      return [(0, _check.body)('firstName').isAlpha().withMessage('You should enter only alphabet').exists().withMessage('Field cannot be empty'), (0, _check.body)('lastName').isAlpha().withMessage('You should enter only alphabet').exists().withMessage('Field cannot be empty'), (0, _check.body)('email').isEmail().withMessage('Should be a valid email').exists().withMessage('Field cannot be empty'), (0, _check.body)('password').isAlphanumeric().withMessage('You should enter only alphanumeric').isLength({
        min: 5
      }).withMessage('Should be atleast 5 characters').exists().withMessage('Field cannot be empty'), (0, _check.body)('type').isIn(['staff', 'admin']).withMessage('Should either be an Admin or staff account').exists().withMessage('Field cannot be empty'), (0, _check.body)('isadmin').isIn(['true', 'false']).withMessage('Should either be true or false').exists().withMessage('Field cannot be empty')];
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
      return [(0, _check.body)('type').isIn(['savings', 'current']).withMessage('Choose a valid account type').exists().withMessage('Field cannot be empty')];
    }
  }, {
    key: "validateUpdateAccount",
    value: function validateUpdateAccount() {
      return [(0, _check.body)('status').isIn(['dormant', 'active']).withMessage('Choose a valid account status').exists().withMessage('Field cannot be empty')];
    }
  }, {
    key: "validateTransaction",
    value: function validateTransaction() {
      return [(0, _check.body)('amount').isNumeric().withMessage('You should enter only numeric').exists().withMessage('Field cannot be empty')];
    }
  }]);

  return Validation;
}();

var _default = Validation;
exports.default = _default;