interface IUserRequest {
  email:string;
  password:string;
}

interface IRoleUser {
  role:string;
}

interface IUser extends IUserRequest, IRoleUser {
  id:number;
  username:string;
}

type IUserResult = Omit<IUser, 'password'>;

export { IUserRequest, IUserResult, IRoleUser };
export default IUser;
