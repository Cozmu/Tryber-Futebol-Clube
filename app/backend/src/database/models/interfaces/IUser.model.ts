interface IUserRequest {
  email:string;
  password:string;
}

type IUserResult = Omit<IUserRequest, 'password'>;

interface IUser extends IUserRequest {
  id:number;
  username:string;
  role:string;
}

export { IUserRequest, IUserResult };
export default IUser;
