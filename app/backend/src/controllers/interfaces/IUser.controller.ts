import { NextFunction, Request, Response } from 'express';

interface IUserController {
  register(req:Request, res:Response, next:NextFunction): Promise<Response | void>
}

export default IUserController;
