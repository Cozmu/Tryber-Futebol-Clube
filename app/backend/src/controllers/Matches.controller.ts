import { Request, Response } from 'express';
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
}

export default MatchesController;
