import { ICRUDModel } from '../Interfaces/ICRUDModel';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

// import { NewEntity } from '../interfaces';

export default class MatchModel implements Partial<ICRUDModel<IMatch>> {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  async finishMath(id: number): Promise<[affectedCount: number]> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });
    return match;
  }
}
