import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchesController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) { }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchService.findAll(req.query);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
