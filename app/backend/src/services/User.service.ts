import { ModelStatic } from 'sequelize';
import * as bcryt from 'bcryptjs';
import IUserValidation from '../validations/interfaces/IUserValidations';
import UserModel from '../database/models/Users.model';
import { IRoleUser, IUserRequest, IUserResult } from '../database/models/interfaces/IUser.model';
import IUserService from './interfaces/IUser.service';
import InvalidParamError from '../errors/invalide-params-error';

class UserService implements IUserService {
  constructor(
    private _userValidation:IUserValidation,
    private _userModel:ModelStatic<UserModel>,
  ) {}

  async getRoleUser(email: string): Promise<IRoleUser | null> {
    const result = await this._userModel.findOne({
      where: { email },
      attributes: ['role'],
    });
    return result;
  }

  async checkUser(user: IUserRequest): Promise<IUserResult> {
    const { email, password } = user;
    this._userValidation.validateFields(email, password);
    const result = await this._userModel.findOne({
      where: { email },
    });
    if (!result || !bcryt.compareSync(password, result.password)) {
      throw new InvalidParamError('Invalid email or password');
    }
    const { id, username, role } = result;
    return { id, username, role, email };
  }
}

export default UserService;
