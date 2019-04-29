import {
    Router,
} from 'express';
import Validator from '../utils/validator';
import Validate from '../middleware/validateResult';
import userController from '../controller/userController';

const router = Router();

router.post('/auth/signup', Validator.validateSignUp(), Validate.validateResult, userController.signupUser);
router.post('/auth/signin', Validator.validateLogin(), Validate.validateResult, userController.loginUser);
router.post('/user', Validator.validateUser(), Validate.validateResult, userController.signupUser);
export default router;
