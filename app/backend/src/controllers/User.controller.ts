import { Request, Response, NextFunction } from 'express';
import IUserService from '../services/interfaces/IUser.service';
import IUserController from './interfaces/IUser.controller';
import authFunctions from '../auth/authFunctions';

class UserController implements IUserController {
  constructor(
    private _UserService:IUserService,
  ) {}

  async register(req:Request, res:Response, next:NextFunction): Promise<Response | void> {
    try {
      const result = await this._UserService.checkUser(req.body);
      const generateToken = authFunctions.createToken(result);
      return res.status(200).json({ token: generateToken });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
