import { NextFunction, Request } from 'express';

interface IUserController {
  register(req:Request, res:Response, next:NextFunction): Promise<Response>
}

export default IUserController;
