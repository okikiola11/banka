"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _accountsController = _interopRequireDefault(require("../controller/accountsController"));

var _validator = _interopRequireDefault(require("../utils/validator"));

var _validateResult = _interopRequireDefault(require("../middleware/validateResult"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

var _authorize = _interopRequireDefault(require("../middleware/authorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use(_authMiddleware.default.verifyToken);
router.post('/', _validator.default.validateAccount(), _validateResult.default.validateResult, _accountsController.default.createAccount);
router.patch('/:accountNumber', _authorize.default.viewAccountAuth, _validator.default.validateUpdateAccount(), _validateResult.default.validateResult, _accountsController.default.updateAccount);
router.get('/', _authorize.default.clientAccount, _accountsController.default.getAllAccount);
router.get('/:accountNumber', _accountsController.default.getSingleAccount);
router.get('/:accountNumber/transactions', _authorize.default.viewAccountAuth, _accountsController.default.getAccountTransaction);
router.delete('/:accountNumber', _authorize.default.viewAccountAuth, _accountsController.default.deleteAccount);
var _default = router;
exports.default = _default;