import { ServiceResponse } from '../Interfaces/Response';
import ITeam from '../Interfaces/teams/ITeam';
import TeamModel from '../model/TeamModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamService {
  constructor(
    private teamModel: Pick<ITeamModel, 'findAll' | 'findById'> = new TeamModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    if (teams) {
      return { status: 'SUCCESSFUL', data: teams };
    }
    return { status: 'NOT_FOUND', data: { message: 'Not found' } };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    if (team) {
      return { status: 'SUCCESSFUL', data: team };
    }
    return { status: 'NOT_FOUND', data: { message: 'Not found' } };
  }
}
