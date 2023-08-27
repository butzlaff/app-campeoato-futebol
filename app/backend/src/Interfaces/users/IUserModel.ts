import { ICRUDModelCreator, ICRUDModelReader } from '../ICRUDModel';
import IUser from './IUser';

// export type IUserModel = ICRUDModel<IUser>;

export interface IUserModel extends ICRUDModelReader<IUser>, ICRUDModelCreator<IUser>{
  findbyEmail(email: IUser['email']): Promise<IUser | null>
}
