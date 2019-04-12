import {
    Router,
} from 'express';
import accountsController from '../controller/accountsController';
import Validation from '../utils/validator';
import authMiddleware from '../middleware/authMiddleware';
import authorize from '../middleware/authorize';

const router = Router();

router.use(authMiddleware.verifyToken);
router.post('/', authorize.createAccountAuth, Validation.validateAccount(), accountsController.createAccount);
router.get('/:accountNumber', authorize.viewAccountAuth, accountsController.getSingleAccount);

export default router;
