import { ModelStatic /* Op */ } from 'sequelize';
import sequelize = require('sequelize');
import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matchers.model';

class LeadboardService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
    private _teamsModel:ModelStatic<TeamsModel>,
  ) {}

  async listHomeLeadboard():Promise<MatchesModel[]> {
    const result = await this._matchesModel.findAll({
      where: { inProgress: false },
      attributes: [
        [sequelize.literal('team_name'), 'name'],
        [sequelize.fn('COUNT', sequelize.col('home_team_id')), 'totalGames'],
        [sequelize.literal('COUNT(CASE WHEN home_team_goals > away_team_goals THEN 1 END)'),
          'totalVictories'],
        [sequelize.literal('COUNT(CASE WHEN home_team_goals = away_team_goals THEN 1 END)'),
          'totalDraws'],
        [sequelize.literal('COUNT(CASE WHEN home_team_goals < away_team_goals THEN 1 END)'),
          'totalLosses'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(`home_team_goals`) - SUM(`away_team_goals`)'), 'goalsBalance']],
      group: ['home_team_id'],
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: [] }],
    });
    return result;
  }
}

export default LeadboardService;

// [sequelize.fn(
//   'COUNT',
//   sequelize.col('home_team_goals') > sequelize.col('away_team_goals'),
// ), 'totalVictories'],
// [sequelize.fn(
//   'COUNT',
//   sequelize.col('home_team_goals') === sequelize.col('away_team_goals'),
// ), 'totalDraws'],
// [sequelize.fn(
//   'COUNT',
//   sequelize.col('home_team_goals') < sequelize.col('away_team_goals'),
// ), 'totalLosses'],
