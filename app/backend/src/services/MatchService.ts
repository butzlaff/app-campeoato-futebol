import { ServiceMessage, ServiceResponse } from '../Interfaces/Response';
import IMatch from '../Interfaces/matches/IMatch';
import MatchModel from '../model/MatchModel';
import TeamModel from '../model/TeamModel';
import { IMatchModel, UpdateMatch } from '../Interfaces/matches/IMatchModel';

type Query = {
  inProgress?: string;
};
export default class TeamService {
  constructor(
    private matchModel: Pick<IMatchModel, 'findAll' |
    'finishMath' | 'updateMatchGoals' | 'createMatch'> = new MatchModel(),
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

  public async updateMatchGoals({ id, awayTeamGoals, homeTeamGoals }: UpdateMatch)
    : Promise<ServiceResponse<ServiceMessage>> {
    try {
      await this.matchModel.updateMatchGoals({ id, awayTeamGoals, homeTeamGoals });
      return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'Error' } };
    }
  }

  public async createMatch(match: Omit<IMatch, 'id'>): Promise<ServiceResponse<IMatch>> {
    try {
      if (match.awayTeamId === match.homeTeamId) {
        return { status: 'INVALID_TEAM',
          data: { message: 'It is not possible to create a match with two equal teams' } };
      }
      const teams = await new TeamModel().findIfExists([match.awayTeamId, match.homeTeamId]);
      if (!teams) {
        return { status: 'NOT_FOUND',
          data: { message: 'There is no team with such id!' } };
      }
      const newMatch = await this.matchModel.createMatch(match);
      return { status: 'CREATED', data: newMatch };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'Error' } };
    }
  }
}
