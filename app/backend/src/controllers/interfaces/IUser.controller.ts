import { NextFunction, Request, Response } from 'express';

interface IUserController {
  register(req:Request, res:Response, next:NextFunction): Promise<Response | void>

  getRoleUser(req:Request, res:Response): Promise<Response>
}

export default IUserController;
