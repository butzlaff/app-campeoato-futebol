import { ICRUDModel } from '../ICRUDModel';
import ITeam from './ITeam';

export interface ITeamModel extends ICRUDModel<ITeam> {
  findIfExists(ids: number[]): Promise<boolean>;
}
