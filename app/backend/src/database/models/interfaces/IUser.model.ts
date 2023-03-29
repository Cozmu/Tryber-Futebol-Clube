interface IUserRequest {
  username:string;
  role:string;
  email:string;
  password:string;
}

interface IUser extends IUserRequest {
  id:number;
}

export { IUserRequest };
export default IUser;
