import { ModelStatic } from 'sequelize';
import MatchesModel from './Matchers.model';
import TeamsModel from './Teams.model';

class LeadboardModel {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
    private _teamsModel:ModelStatic<TeamsModel>,
  ) {}

  async findAll():Promise<MatchesModel[]> {
    const request = await this._matchesModel.findAll({ where: { inProgress: false } });
    return request;
  }
}

export default LeadboardModel;
