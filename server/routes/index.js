import { Router } from 'express';
import authRoutes from './authRoutes';
import fileRoutes from './fileRoutes';
import userRoutes from './userRoutes';
import folderRoutes from './folderRoutes';
import paypal from './paymentRoutes';
import creditCard from './creditCardRoutes';

const router = Router();

router.use(userRoutes);
router.use(fileRoutes);
router.use('/auth', authRoutes);
router.use(folderRoutes);
router.use(paypal);
router.use(creditCard);

export default router;