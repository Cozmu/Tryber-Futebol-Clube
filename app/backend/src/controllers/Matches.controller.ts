import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';
import IMatchesController from './interfaces/IMatches.controller';

class MatchesController implements IMatchesController {
  constructor(
    private _matchesService:MatchesService,
  ) {}

  async listAll(_req:Request, res:Response): Promise<Response> {
    const result = await this._matchesService.getAll();
    return res.status(200).json(result);
  }
}

export default MatchesController;
