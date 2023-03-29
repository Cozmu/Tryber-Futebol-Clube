import IUser, { IUserRequest } from '../../database/models/interfaces/IUser.model';

interface IUserService {
  create(user:IUserRequest):Promise<IUser>
}

export default IUserService;
