import { ModelStatic } from 'sequelize';
import ITeamsValidation from '../validations/interfaces/ITeamsValidation';
import ITeams from '../database/models/interfaces/ITeams.model';
import TeamsModel from '../database/models/Teams.model';
import ITeamsService from './interfaces/ITeams.service';

class TeamsService implements ITeamsService {
  constructor(
    private _teamsModel:ModelStatic<TeamsModel>,
    private _teamsValidation:ITeamsValidation,
  ) {}

  async getAll(): Promise<ITeams[]> {
    return this._teamsModel.findAll();
  }

  async getById(id: number): Promise<ITeams | null> {
    const result = await this._teamsModel.findByPk(id);
    this._teamsValidation.validationTeam(result);
    return result;
  }
}

export default TeamsService;
