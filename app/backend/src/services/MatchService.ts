import { ServiceResponse } from '../Interfaces/Response';
import IMatch from '../Interfaces/matches/IMatch';
import MatchModel from '../model/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class TeamService {
  constructor(
    private matchModel: Pick<IMatchModel, 'findAll' | 'findById'> = new MatchModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    if (matches) {
      return { status: 'SUCCESSFUL', data: matches };
    }
    return { status: 'NOT_FOUND', data: { message: 'Not found' } };
  }
}
