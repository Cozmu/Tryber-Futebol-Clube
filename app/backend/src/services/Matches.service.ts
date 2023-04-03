import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/Teams.model';
import IMatches from '../database/models/interfaces/IMatches.model';
import MatchesModel from '../database/models/Matchers.model';
import IMatchesService from './interfaces/IMatches.service';

class MatchesService implements IMatchesService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
  ) {}

  async getAll(): Promise<IMatches[]> {
    return this._matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }
}

export default MatchesService;
