"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _validator = _interopRequireDefault(require("../utils/validator"));

var _validateResult = _interopRequireDefault(require("../middleware/validateResult"));

var _userController = _interopRequireDefault(require("../controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/auth/signup', _validator.default.validateSignUp(), _validateResult.default.validateResult, _userController.default.signupUser);
router.post('/auth/signin', _validator.default.validateLogin(), _validateResult.default.validateResult, _userController.default.loginUser);
router.post('/user', _validator.default.validateUser(), _validateResult.default.validateResult, _userController.default.signupUser);
var _default = router;
exports.default = _default;