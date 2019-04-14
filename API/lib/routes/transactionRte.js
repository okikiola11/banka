'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;

let _express = require('express');

let _transaction = _interopRequireDefault(require('../controller/transaction'));

let _validator = _interopRequireDefault(require('../utils/validator'));

let _authMiddleware = _interopRequireDefault(require('../middleware/authMiddleware'));

let _authorize = _interopRequireDefault(require('../middleware/authorize'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj,
    };
}

let router = (0, _express.Router)();
router.use(_authMiddleware.default.verifyToken, _authorize.default.authTransaction);
router.post('/debit', _validator.default.validateTransaction(), _transaction.default.debitAccount);
let _default = router;
exports.default = _default;
