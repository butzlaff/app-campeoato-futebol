import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import SetHomeOrAway from '../middlewares/SetHomeOrAway';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get(
  '/home',
  SetHomeOrAway.createHomeOrAway,
  (_req: Request, res: Response) => leaderboardController.findAll(_req, res),
);
router.get(
  '/away',
  SetHomeOrAway.createHomeOrAway,
  (_req: Request, res: Response) => leaderboardController.findAll(_req, res),
);

export default router;
