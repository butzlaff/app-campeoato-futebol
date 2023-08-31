import { ICRUDModel } from '../Interfaces/ICRUDModel';
import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

// import { NewEntity } from '../interfaces';

export default class TeamModel implements Partial<ICRUDModel<ITeam>> {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }

  async findIfExists(ids: number[]): Promise<boolean> {
    const teams = await this.model.findAll({
      where: {
        id: ids,
      },
    });
    if (teams.length === ids.length) {
      return true;
    }
    return false;
  }
}
