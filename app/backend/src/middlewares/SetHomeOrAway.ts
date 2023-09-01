import { NextFunction, Request, Response } from 'express';

export default class SetHomeOrAway {
  static createHomeOrAway(req: Request, _res: Response, next: NextFunction): void {
    const { home, away } = req.body;
    if (req.path === '/home' || home) {
      req.body.location = 'homeTeam';
    } else if (req.path === '/away' || away) {
      req.body.location = 'awayTeam';
    }

    next();
  }
}
