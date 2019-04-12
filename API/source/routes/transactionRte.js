import {
    Router,
} from 'express';
import transaction from '../controller/transaction';
import Validation from '../utils/validator';
import authMiddleware from '../middleware/authMiddleware';
import authorize from '../middleware/authorize';

const router = Router();

router.use(authMiddleware.verifyToken, authorize.authTransaction);
router.post('/debit', Validation.validateTransaction(), transaction.debitAccount);

export default router;
