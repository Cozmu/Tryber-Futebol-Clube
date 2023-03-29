import { Request, Response } from 'express';
import ITeamsService from '../services/interfaces/ITeams.service';
import ITeamsController from './interfaces/ITeams.controller';

class TeamsController implements ITeamsController {
  constructor(
    private _TeamsService:ITeamsService,
  ) {}

  async listAll(req:Request, res:Response): Promise<Response> {
    const teamsResult = await this._TeamsService.getAll();
    return res.status(200).json(teamsResult);
  }
}

export default TeamsController;
