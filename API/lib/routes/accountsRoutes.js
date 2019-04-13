Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;

const _express = require('express');

const _accountsController = _interopRequireDefault(require('../controller/accountsController'));

const _validator = _interopRequireDefault(require('../utils/validator'));

const _authMiddleware = _interopRequireDefault(require('../middleware/authMiddleware'));

const _authorize = _interopRequireDefault(require('../middleware/authorize'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj,
    };
}

const router = (0, _express.Router)();
router.use(_authMiddleware.default.verifyToken);
router.post('/', _authorize.default.createAccountAuth, _validator.default.validateAccount(), _accountsController.default.createAccount);
router.delete('/:accountNumber', _authorize.default.viewAccountAuth, _accountsController.default.deleteAccount);
const _default = router;
exports.default = _default;
