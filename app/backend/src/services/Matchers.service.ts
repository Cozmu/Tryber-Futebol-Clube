import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/Teams.model';
import IMatcher from '../database/models/interfaces/IMatcher.model';
import MatcherModel from '../database/models/Matchers.model';
import IMatcherService from './interfaces/IMatcher.service';

class MatcherService implements IMatcherService {
  constructor(
    private _matcherModel:ModelStatic<MatcherModel>,
  ) {}

  async getAll(): Promise<IMatcher[]> {
    return this._matcherModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }
}

export default MatcherService;
