import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/Teams.model';
import IMatches from '../database/models/interfaces/IMatches.model';
import MatchesModel from '../database/models/Matchers.model';
import IMatchesService from './interfaces/IMatches.service';

class MatchesService implements IMatchesService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
  ) {}

  async getAll(inProgress:string): Promise<IMatches[]> {
    if (inProgress) {
      return this._matchesModel.findAll({
        where: { inProgress: inProgress === 'true' },
        include: [
          { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
          { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
    }
    return this._matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  async updatePatch(id:number): Promise<void> {
    await this._matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}

export default MatchesService;
