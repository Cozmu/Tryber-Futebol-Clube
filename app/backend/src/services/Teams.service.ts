import { ModelStatic } from 'sequelize';
import ITeams from '../database/models/interfaces/ITeams.model';
import TeamsModel from '../database/models/Teams.model';
import ITeamsService from './interfaces/ITeams.service';

class TeamsService implements ITeamsService {
  constructor(
    private _teamsModel:ModelStatic<TeamsModel>,
  ) {}

  async getAll(): Promise<ITeams[]> {
    return this._teamsModel.findAll();
  }

  async getById(id: number): Promise<ITeams | null> {
    return this._teamsModel.findByPk(id);
  }
}

export default TeamsService;
