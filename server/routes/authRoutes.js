import { Router } from 'express';
import authController from '../controllers/authController';
import checkUser from '../middleware/checkUser';
// import cors from 'cors';

const router = Router();

router.post('/signup', checkUser.verifyUsedEmail, authController.signUp);
router.post('/signin', authController.signIn);

export default router;