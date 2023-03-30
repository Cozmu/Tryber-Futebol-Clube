import { IUserRequest, IUserResult, IRoleUser } from '../../database/models/interfaces/IUser.model';

interface IUserService {
  getRoleUser(email:string):Promise<IRoleUser | null>
  checkUser(user:IUserRequest):Promise<IUserResult>
}

export default IUserService;
