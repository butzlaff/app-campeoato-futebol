import { ICRUDModel } from '../ICRUDModel';
import IMatch from './IMatch';

export type UpdateMatch = Pick<IMatch, 'awayTeamGoals' | 'homeTeamGoals' | 'id'>;

export interface IMatchModel extends Partial<ICRUDModel<IMatch>> {
  findAll(): Promise<IMatch[]>;
  finishMath(id: IMatch['id']): Promise<[affectedCount: number]>;
  updateMatchGoals({ id, awayTeamGoals, homeTeamGoals }: UpdateMatch) :
  Promise<[affectedCount: number]>;
  createMatch(match: Omit<IMatch, 'id'>): Promise<IMatch>;
}
