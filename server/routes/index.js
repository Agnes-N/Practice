import { Router } from 'express';
import authRoutes from './authRoutes';
import fileRoutes from './fileRoutes';
import userRoutes from './userRoutes';
import folderRoutes from './folderRoutes';

const router = Router();

router.use(userRoutes);
router.use(fileRoutes);
router.use('/auth', authRoutes);
router.use(folderRoutes);

export default router;