import { Request, Response } from 'express';
import ITeamsService from '../services/interfaces/ITeams.service';
import ITeamsController from './interfaces/ITeams.controller';

class TeamsController implements ITeamsController {
  constructor(
    private _TeamsService:ITeamsService,
  ) {}

  async listAll(_req:Request, res:Response): Promise<Response> {
    const teamsResult = await this._TeamsService.getAll();
    return res.status(200).json(teamsResult);
  }

  async listById(req: Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const teamResult = await this._TeamsService.getById(Number(id));
    if (teamResult === null) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }
    return res.status(200).json(teamResult);
  }
}

export default TeamsController;
