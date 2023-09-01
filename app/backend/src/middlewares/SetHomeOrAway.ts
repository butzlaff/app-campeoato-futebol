import { NextFunction, Request, Response } from 'express';

export default class SetHomeOrAway {
  static createHomeOrAway(req: Request, _res: Response, next: NextFunction): void {
    if (req.path === '/home') {
      req.body.location = 'homeTeam';
    } else if (req.path === '/away') {
      req.body.location = 'awayTeam';
    } else {
      req.body.location = 'both';
    }

    next();
  }
}
