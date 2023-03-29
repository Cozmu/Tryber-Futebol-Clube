import { ModelStatic } from 'sequelize';
import ITeams from '../database/models/interfaces/ITeams.model';
import TeamsModel from '../database/models/Teams.model';
import ITeamsService from './interfaces/ITeams.service';

class TeamsService implements ITeamsService {
  constructor(
    private _TeamsModel:ModelStatic<TeamsModel>,
  ) {}

  async getAll(): Promise<ITeams[]> {
    return this._TeamsModel.findAll();
  }

  async getById(id: number): Promise<ITeams | null> {
    return this._TeamsModel.findByPk(id);
  }
}

export default TeamsService;
