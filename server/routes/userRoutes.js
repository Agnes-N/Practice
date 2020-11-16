import { Router } from 'express';
import TokenHandler from '../middleware/tokenHandler';
import UserController from '../controllers/userController';

const router = Router();

router.get('/user/:userId', TokenHandler.verifyToken, UserController.retrieveSingleUser);


export default router;