import IUser from '../Interfaces/users/IUser';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
// import { ICRUDModel } from '../Interfaces/ICRUDModel';

// import { NewEntity } from '../interfaces';

export default class TeamModel implements Partial<IUserModel> {
  private model = SequelizeUsers;

  async findAll(): Promise<IUser[]> {
    const users = await this.model.findAll();
    return users;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    return user;
  }

  async findbyEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
