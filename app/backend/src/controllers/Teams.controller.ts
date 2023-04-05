import { NextFunction, Request, Response } from 'express';
import ITeamsService from '../services/interfaces/ITeams.service';
import ITeamsController from './interfaces/ITeams.controller';

class TeamsController implements ITeamsController {
  constructor(
    private _teamsService:ITeamsService,
  ) {}

  async listAll(_req:Request, res:Response): Promise<Response> {
    const teamsResult = await this._teamsService.getAll();
    return res.status(200).json(teamsResult);
  }

  async listById(req: Request, res:Response, next:NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const teamResult = await this._teamsService.getById(Number(id));
      return res.status(200).json(teamResult);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamsController;
