import {
    Router,
} from 'express';
import accountsController from '../controller/accountsController';
import Validation from '../utils/validator';
import authMiddleware from '../middleware/authMiddleware';
import authorize from '../middleware/authorize';

const router = Router();

router.use(authMiddleware.verifyToken);
router.post('/', Validation.validateAccount(), accountsController.createAccount);
router.patch('/:accountNumber', authorize.viewAccountAuth, Validation.validateUpdateAccount(), accountsController.updateAccount);
router.get('/', authorize.clientAccount, accountsController.getAllAccount);
router.get('/:accountNumber', accountsController.getSingleAccount);
router.delete('/:accountNumber', authorize.viewAccountAuth, accountsController.deleteAccount);

export default router;