import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchesController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) { }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
