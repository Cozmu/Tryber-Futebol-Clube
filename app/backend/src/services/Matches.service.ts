import { ModelStatic } from 'sequelize';
import IMatchesValidate from '../validations/interfaces/IMatchesValidation';
import TeamsModel from '../database/models/Teams.model';
import IMatches, {
  INewMatcherRequest,
  IRequestScoreboard,
} from '../database/models/interfaces/IMatches.model';
import MatchesModel from '../database/models/Matchers.model';

import IMatchesService from './interfaces/IMatches.service';
import TeamsService from './Teams.service';

class MatchesService implements IMatchesService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
    private _matchesValidate:IMatchesValidate,
    private _teamsService:TeamsService,
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

  async updateMatchesProgression(id:number): Promise<number | void> {
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

  async updateMatchesScore(id:number, body:IRequestScoreboard): Promise<void> {
    await this.getMatchesById(id);
    await this._matchesModel.update( // retorna [affectedCount: number]
      body,
      { where: { id, inProgress: true } },
    );
  }

  async insertNewMatcher(newMatche: INewMatcherRequest): Promise<IMatches> {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = newMatche;
    this._matchesValidate.checkIfTeamsAreEqual(awayTeamId, homeTeamId);
    const arrayIdTeams = [awayTeamId, homeTeamId];
    await Promise.all(arrayIdTeams.map((teamId) => this._teamsService.getById(teamId)));
    const result = await this._matchesModel
      .create({ awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress: true });
    return result as MatchesModel;
  }
}

export default MatchesService;
