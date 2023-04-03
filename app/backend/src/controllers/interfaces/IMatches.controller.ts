import { NextFunction, Request, Response } from 'express';

interface IMatchesController {
  listAll(req:Request, res:Response):Promise<Response>,
  updateMatchProgression(req:Request, res:Response): Promise<Response>,
  updateMatchScore(req:Request, res:Response, next:NextFunction): Promise<Response | void>
}

export default IMatchesController;
