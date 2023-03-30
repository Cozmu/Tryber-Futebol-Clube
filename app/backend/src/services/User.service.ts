import { ModelStatic } from 'sequelize';
import * as bcryt from 'bcryptjs';
import IUserValidation from '../validations/interfaces/IUserValidations';
import UserModel from '../database/models/Users.model';
import { IUserRequest } from '../database/models/interfaces/IUser.model';
import IUserService from './interfaces/IUser.service';
import InvalidParamError from '../errors/invalide-params-error';

class UserService implements IUserService {
  constructor(
    private _UserValidation:IUserValidation,
    private _UserModel:ModelStatic<UserModel>,
  ) {}

  async checkUser(user: IUserRequest): Promise<string> {
    this._UserValidation.validateFields(user.email, user.password);
    const result = await this._UserModel.findOne({
      where: { email: user.email },
    });
    if (!result || !bcryt.compareSync(user.password, result.password)) {
      throw new InvalidParamError('Invalid email or password');
    }
    return result.email;
  }
}

export default UserService;
