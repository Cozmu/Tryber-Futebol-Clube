import { NextFunction, Request, Response } from 'express';

interface IMatchesController {
  listAll(req:Request, res:Response):Promise<Response>,
  updateMatchesProgression(req:Request, res:Response, next:NextFunction): Promise<Response | void>,
  updateMatchesScore(req:Request, res:Response, next:NextFunction): Promise<Response | void>
  insertNewMatcher(req:Request, res:Response, next:NextFunction): Promise<Response | void>
}

export default IMatchesController;
