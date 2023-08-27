import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (_req: Request, res: Response) => teamsController.findAll(_req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.findById(req, res));

export default router;
