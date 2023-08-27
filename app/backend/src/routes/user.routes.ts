import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validate';

const router = Router();

const userController = new UserController();

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) =>
    userController.getRole(req, res),
);

router.post(
  '/',
  Validations.validateUser,
  (req: Request, res: Response) =>
    userController.login(req, res),
);
// router.get('/:id', (req: Request, res: Response) => userController.findById(req, res));

export default router;
