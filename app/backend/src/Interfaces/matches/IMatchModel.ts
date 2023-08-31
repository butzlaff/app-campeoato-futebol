import { ICRUDModel } from '../ICRUDModel';
import IMatch from './IMatch';

export type UpdateMatch = Pick<IMatch, 'awayTeamGoals' | 'homeTeamGoals' | 'id'>;

export interface IMatchModel extends ICRUDModel<IMatch> {
  finishMath(id: IMatch['id']): Promise<[affectedCount: number]>
  updateMatch({ id, awayTeamGoals, homeTeamGoals }: UpdateMatch) : Promise<[affectedCount: number]>
}
