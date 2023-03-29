import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/Teams.model';
import ITeamsService from './interfaces/ITeams.service';

class TeamsService implements ITeamsService {
  constructor(
    private readonly _TeamsModel:ModelStatic<TeamsModel>,
  ) {}

  async getAll(): Promise<TeamsModel[]> {
    return this._TeamsModel.findAll();
  }
}

export default TeamsService;
