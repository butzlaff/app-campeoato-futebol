import { ICRUDModel } from '../ICRUDModel';
import IMatch from './IMatch';

export interface IMatchModel extends ICRUDModel<IMatch> {
  finishMath(id: IMatch['id']): Promise<[affectedCount: number]>
}
