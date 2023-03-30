interface IUserRequest {
  email:string;
  password:string;
}

interface IUser extends IUserRequest {
  id:number;
  username:string;
  role:string;
}

export { IUserRequest };
export default IUser;
