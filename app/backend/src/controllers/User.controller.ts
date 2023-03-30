import { Request, Response, NextFunction } from 'express';
import IUserService from '../services/interfaces/IUser.service';
import IUserController from './interfaces/IUser.controller';

class UserController implements IUserController {
  constructor(
    private _UserService:IUserService,
  ) {}

  async register(req:Request, res:Response, next:NextFunction): Promise<Response | void> {
    try {
      const result = await this._UserService.checkUser(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
