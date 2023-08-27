import * as bcrypt from 'bcryptjs';
import IUser, { IUserLogin } from '../Interfaces/users/IUser';
import { IToken } from '../Interfaces/IToken';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/Response';
import UserModel from '../model/UserModel';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: Pick<IUserModel, 'findbyEmail'> = new UserModel(),
  ) { }

  // public async findAll(): Promise<ServiceResponse<IUser[]>> {
  //   const teams = await this.userModel.findAll();
  //   if (teams) {
  //     return { status: 'SUCCESSFUL', data: teams };
  //   }
  //   return { status: 'NOT_FOUND', data: { message: 'Not found' } };
  // }

  public async login({ email, password }: IUserLogin):
  Promise<ServiceResponse<IToken | null>> {
    const user = await this.userModel.findbyEmail(email);

    // if (!user) return { status: 'UNAUTHORIZED', data: { message: 'User not found' } };
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string):
  Promise<ServiceResponse<Pick<IUser, 'role'> | null>> {
    const user = await this.userModel.findbyEmail(email);
    if (user) {
      const { role } = user;
      return { status: 'SUCCESSFUL', data: { role } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }
}
