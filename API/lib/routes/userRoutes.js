"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _validator = _interopRequireDefault(require("../utils/validator"));

var _userController = _interopRequireDefault(require("../controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/signup', _validator.default.validateSignUp(), _userController.default.signupUser);
router.post('/signin', _validator.default.validateLogin(), _userController.default.loginUser);
var _default = router;
exports.default = _default;