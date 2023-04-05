import { ModelStatic } from 'sequelize';
import IMatchesValidate from '../validations/interfaces/IMatchesValidation';
import TeamsModel from '../database/models/Teams.model';
import IMatches, { IRequestScoreboard } from '../database/models/interfaces/IMatches.model';
import MatchesModel from '../database/models/Matchers.model';
import IMatchesService from './interfaces/IMatches.service';

class MatchesService implements IMatchesService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
    private _matchesValidate:IMatchesValidate,
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

  async updateMatchProgression(id:number): Promise<number | void> {
    const [result] = await this._matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
    this._matchesValidate.checkUpdate(result);
  }

  async getMatchesById(id:number): Promise<void> {
    const result = await this._matchesModel.findByPk(id);
    this._matchesValidate.checkIfTheMatchExists(result);
  }

  async updateMatchScore(id:number, body:IRequestScoreboard): Promise<void> {
    await this.getMatchesById(id);
    await this._matchesModel.update( // retorna [affectedCount: number]
      body,
      { where: { id, inProgress: true } },
    );
  }
}

export default MatchesService;
