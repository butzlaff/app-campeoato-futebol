import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login({ email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public getRole = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
    const { status, data } = await this.userService.getRole(email);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
