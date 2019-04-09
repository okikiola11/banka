import {
    Router,
} from 'express';
import userController from '../controller/userController';

const router = Router();

router.post('/signup', userController.signupUser);

export default router;
