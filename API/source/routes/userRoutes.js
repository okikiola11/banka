import {
    Router,
} from 'express';
import Validator from '../utils/validator';
import userController from '../controller/userController';

const router = Router();

router.post('/signup', Validator.validateSignUp(), userController.signupUser);
router.post('/signin', Validator.validateLogin(), userController.loginUser);

export default router;
