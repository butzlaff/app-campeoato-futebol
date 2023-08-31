import { ServiceMessage, ServiceResponse } from '../Interfaces/Response';
import IMatch from '../Interfaces/matches/IMatch';
import MatchModel from '../model/MatchModel';
import { IMatchModel, UpdateMatch } from '../Interfaces/matches/IMatchModel';

type Query = {
  inProgress?: string;
};
export default class TeamService {
  constructor(
    private matchModel: Pick<IMatchModel, 'findAll' | 'findById'
    | 'finishMath' | 'updateMatch'> = new MatchModel(),
  ) { }

  public async findAll(query: Query): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    let result;
    if (query.inProgress) {
      if (query.inProgress === 'true') {
        result = matches.filter((match) => match.inProgress);
      } else {
        result = matches.filter((match) => !match.inProgress);
      }
    } else {
      result = matches;
    }
    return { status: 'SUCCESSFUL', data: result };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    try {
      await this.matchModel.finishMath(id);
      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'Error' } };
    }
  }

  public async updateMatch({ id, awayTeamGoals, homeTeamGoals }: UpdateMatch)
    : Promise<ServiceResponse<ServiceMessage>> {
    try {
      await this.matchModel.updateMatch({ id, awayTeamGoals, homeTeamGoals });
      return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'Error' } };
    }
  }
}
