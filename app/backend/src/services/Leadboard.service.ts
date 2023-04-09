import { ModelStatic /* Op */ } from 'sequelize';
import sequelize = require('sequelize');
// import ILeadboard from '../database/models/interfaces/ILeadboard.model';
import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matchers.model';

class LeadboardService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
    private _teamsModel:ModelStatic<TeamsModel>,
  ) {}

  async listHomeLeadboard():Promise<MatchesModel[]> {
    const request = await this._matchesModel.findAll({ where: { inProgress: false },
      attributes: [[sequelize.literal('team_name'), 'name'],
        [sequelize.fn('COUNT', sequelize.col('home_team_id')), 'totalGames'],
        [sequelize.literal('COUNT(CASE WHEN home_team_goals > away_team_goals THEN 1 END)'),
          'totalVictories'],
        [sequelize.literal('COUNT(CASE WHEN home_team_goals = away_team_goals THEN 1 END)'),
          'totalDraws'],
        [sequelize.literal('COUNT(CASE WHEN home_team_goals < away_team_goals THEN 1 END)'),
          'totalLosses'],
        [sequelize.fn('SUM', sequelize.cast(sequelize.col('home_team_goals'), 'integer')),
          'goalsFavor'],
        [sequelize.fn('SUM', sequelize.cast(sequelize.col('away_team_goals'), 'integer')),
          'goalsOwn'],
        [sequelize.literal('SUM(`home_team_goals`) - SUM(`away_team_goals`)'), 'goalsBalance']],
      group: ['home_team_id'],
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: [] }],
    });
    return request;
  }

  // const result = this.addScoreAndEfficiency(request);
  // addScoreAndEfficiency = (request:ILeadboard[]) => {
  //   for (let i = 0; i < request.length; i += 1) {
  //     request[i].totalPoints = (request[i].totalVictories * 3) + request[i].totalDraws;
  //     request[i].efficiency = ((request[i].totalPoints / (request[i].totalGames * 3)) * 100)
  //       .toFixed(2);
  //   }
  // };
}

export default LeadboardService;
