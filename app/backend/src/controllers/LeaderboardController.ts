import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService: LeaderBoardService = new LeaderBoardService(),
  ) { }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { location } = req.body;
    const { status, data } = await this.leaderBoardService.findAll(location);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
