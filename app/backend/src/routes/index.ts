import { Router } from 'express';
import teamRoutes from './teams.routes';
import userRoutes from './user.routes';

const router = Router();
router.use('/teams', teamRoutes);
router.use('/login', userRoutes);

export default router;
