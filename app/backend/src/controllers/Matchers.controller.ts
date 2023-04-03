import { Request, Response } from 'express';
import MatcherService from '../services/Matchers.service';
import IMatcherController from './interfaces/IMatcher.controller';

class MatcherController implements IMatcherController {
  constructor(
    private _matcherService:MatcherService,
  ) {}

  async listAll(_req:Request, res:Response): Promise<Response> {
    const result = await this._matcherService.getAll();
    return res.status(200).json(result);
  }
}

export default MatcherController;
