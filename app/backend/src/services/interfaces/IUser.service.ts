import { IUserRequest } from '../../database/models/interfaces/IUser.model';

interface IUserService {
  checkUser(user:IUserRequest):Promise<string>
}

export default IUserService;
