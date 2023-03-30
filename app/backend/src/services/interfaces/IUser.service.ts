import { IUserRequest, IUserResult } from '../../database/models/interfaces/IUser.model';

interface IUserService {
  checkUser(user:IUserRequest):Promise<IUserResult | void>
}

export default IUserService;
