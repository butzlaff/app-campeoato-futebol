import { Router } from 'express';
import teamRoutes from './teams.routes';

const router = Router();
router.use('/teams', teamRoutes);

export default router;
