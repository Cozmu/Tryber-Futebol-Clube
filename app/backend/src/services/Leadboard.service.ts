import { ModelStatic } from 'sequelize';
import sequelize = require('sequelize');
// import ILeadboard from '../database/models/interfaces/ILeadboard.model';
import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matchers.model';
import {
  goalsBalance,
  totalDraws,
  totalLosses,
  totalPoints,
  totalVictories,
  totalGamesSubquery,
} from './interfaces/utils/querySQL';

class LeadboardService {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
  ) {}

  async listHomeLeadboard():Promise<MatchesModel[]> {
    const request = await this._matchesModel.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.literal('team_name'), 'name'],
        [sequelize.literal(totalPoints), 'totalPoints'],
        [sequelize.fn('COUNT', sequelize.col('home_team_id')), 'totalGames'],
        [sequelize.literal(totalVictories), 'totalVictories'],
        [sequelize.literal(totalDraws), 'totalDraws'],
        [sequelize.literal(totalLosses), 'totalLosses'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal(goalsBalance), 'goalsBalance'],
        [sequelize.literal(`ROUND(${totalPoints} / (${totalGamesSubquery} * 3) * 100, 2)`),
          'efficiency'],
      ],
      group: ['home_team_id'],
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: [] }],
    });
    return request;
  }

  // const result = this.addScoreAndEfficiency(request);
  // addScoreAndEfficiency = (request:ILeadboard[]) => {
  //   for (let i = 0; i < request.length; i += 1) {
  //     request[i].totalPoints = (request[i].totalVictories * 3) + request[i].totalDraws;
  //     request[i].efficiency = (request[i].totalPoints / (request[i].totalGames * 3)) * 100;
  //   }
  //   console.log('entrou');
  //   return request;
  // };
}

export default LeadboardService;
