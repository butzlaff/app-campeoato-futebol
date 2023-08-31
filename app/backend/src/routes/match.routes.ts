import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validate';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', (_req: Request, res: Response) => matchController.findAll(_req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (_req: Request, res: Response) =>
    matchController.finishMatch(_req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) =>
    matchController.updateMatchGoals(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) =>
    matchController.createMatch(req, res),
);

export default router;
