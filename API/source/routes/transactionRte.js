import {
    Router,
} from 'express';
import transaction from '../controller/transaction';
import Validation from '../utils/validator';
import Validate from '../middleware/validateResult';
import authMiddleware from '../middleware/authMiddleware';
import authorize from '../middleware/authorize';

const router = Router();

router.use(authMiddleware.verifyToken, authorize.authTransaction);
router.post('/:accountNumber/credit', Validation.validateTransaction(), Validate.validateResult, transaction.creditAccount);
router.post('/:accountNumber/debit', Validation.validateTransaction(), Validate.validateResult, transaction.debitAccount);
router.get('/:transactionId', transaction.getSingleTransactions);

export default router;
