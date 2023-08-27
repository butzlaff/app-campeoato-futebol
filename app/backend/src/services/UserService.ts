import * as bcrypt from 'bcryptjs';
import { IUserLogin } from '../Interfaces/users/IUser';
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

  public async findByEmail({ email, password }: IUserLogin):
  Promise<ServiceResponse<IToken | null>> {
    const user = await this.userModel.findbyEmail(email);

    // if (!user) return { status: 'UNAUTHORIZED', data: { message: 'User not found' } };
    console.log(user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
