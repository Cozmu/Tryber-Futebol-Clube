import { ModelStatic } from 'sequelize';
// import * as bcryt from 'bcryptjs';
import IUserValidation from '../middlewares/interfaces/IUserValidations';
import UserModel from '../database/models/Users.model';
import { IUserRequest, IUserResult } from '../database/models/interfaces/IUser.model';
import IUserService from './interfaces/IUser.service';

class UserService implements IUserService {
  constructor(
    private _userValidations: IUserValidation,
    private _UserModel:ModelStatic<UserModel>,
  ) {}

  async checkUser(user: IUserRequest): Promise<IUserResult | void> {
    // bcryt.compareSync()
    const [result] = await this._UserModel.findAll({
      where: { email: user.email }, // verificação de password errada
      attributes: ['email'],
    });
    return result;
  }
}

export default UserService;
