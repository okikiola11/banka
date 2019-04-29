"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _transaction = _interopRequireDefault(require("../controller/transaction"));

var _validator = _interopRequireDefault(require("../utils/validator"));

var _validateResult = _interopRequireDefault(require("../middleware/validateResult"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

var _authorize = _interopRequireDefault(require("../middleware/authorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use(_authMiddleware.default.verifyToken, _authorize.default.authTransaction);
router.post('/:accountNumber/credit', _validator.default.validateTransaction(), _validateResult.default.validateResult, _transaction.default.creditAccount);
router.post('/:accountNumber/debit', _validator.default.validateTransaction(), _validateResult.default.validateResult, _transaction.default.debitAccount);
router.get('/:transactionId', _transaction.default.getSingleTransactions);
var _default = router;
exports.default = _default;