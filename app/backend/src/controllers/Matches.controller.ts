import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/Matches.service';
import IMatchesController from './interfaces/IMatches.controller';

class MatchesController implements IMatchesController {
  constructor(
    private _matchesService:MatchesService,
  ) {}

  async listAll(req:Request, res:Response): Promise<Response> {
    const { inProgress } = req.query;
    const result = await this._matchesService.getAll(inProgress as string);
    return res.status(200).json(result);
  }

  async updateMatchesProgression(req:Request, res:Response, next:NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      await this._matchesService.updateMatchesProgression(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateMatchesScore(req:Request, res:Response, next:NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this._matchesService.updateMatchesScore(Number(id), req.body);
      return res.status(200).json({ message: 'updated scoreboard' });
    } catch (error) {
      next(error);
    }
  }

  async insertNewMatcher(req:Request, res:Response, next:NextFunction): Promise<Response | void> {
    try {
      const result = await this._matchesService.insertNewMatcher(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;
