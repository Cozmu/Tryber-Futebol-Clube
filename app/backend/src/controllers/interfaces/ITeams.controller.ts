import { NextFunction, Request, Response } from 'express';

interface ITeamsController {
  listAll(req:Request, res:Response): Promise<Response>
  listById(req: Request, res:Response, next:NextFunction): Promise<Response | void>

}

export default ITeamsController;
