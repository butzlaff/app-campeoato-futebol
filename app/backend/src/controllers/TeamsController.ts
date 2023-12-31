import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamsController {
  constructor(
    private teamService: TeamService = new TeamService(),
  ) { }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.teamService.findById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
