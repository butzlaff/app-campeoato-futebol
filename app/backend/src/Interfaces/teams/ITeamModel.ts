import { ICRUDModel } from '../ICRUDModel';
import ITeam from './ITeam';

export type ITeamModel = ICRUDModel<ITeam>;

export interface ICRUDModelTeam<ITeam> {
  findAll(): Promise<ITeam>,
}
