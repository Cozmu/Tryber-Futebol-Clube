import ILeadboard from '../database/models/interfaces/ILeadboard.model';
import LeadboardModel from '../database/models/LeadboardModel';
import ILeadboardService from './interfaces/ILeadboard.service';

class LeadboardService implements ILeadboardService {
  constructor(
    private _leadboardModel:LeadboardModel,
  ) {}

  async listHomeLeadboard():Promise<ILeadboard[]> {
    const requestMatches = await this._leadboardModel.findAllMatches();
    const requestTeams = await this._leadboardModel.findAllTeams();
    const requestAllFields = await Promise.all(requestTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: this._leadboardModel.requestTotalPoints(team.id, 'homeTeamId', requestMatches),
      totalGames: this._leadboardModel.requestTotalGames(team.id, 'homeTeamId', requestMatches),
      totalVictories: this._leadboardModel.requestWins(team.id, 'homeTeamId', requestMatches),
      totalDraws: this._leadboardModel.requestDraws(team.id, 'homeTeamId', requestMatches),
      totalLosses: this._leadboardModel.requestLosses(team.id, 'homeTeamId', requestMatches),
      goalsFavor: this._leadboardModel
        .requestGoals(team.id, 'homeTeamId', requestMatches)?.goalsFavor,
      goalsOwn: this._leadboardModel
        .requestGoals(team.id, 'homeTeamId', requestMatches)?.goalsOwn,
      goalsBalance: this._leadboardModel.requestGoalsBalance(team.id, 'homeTeamId', requestMatches),
      efficiency: this._leadboardModel.requestEfficiency(team.id, 'homeTeamId', requestMatches),
    })));
    const result = this._leadboardModel.requestOrder(requestAllFields);
    return result;
  }

  async listAwayLeadboard():Promise<ILeadboard[]> {
    const requestMatches = await this._leadboardModel.findAllMatches();
    const requestTeams = await this._leadboardModel.findAllTeams();
    const requestAllFields = await Promise.all(requestTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: this._leadboardModel.requestTotalPoints(team.id, 'awayTeamId', requestMatches),
      totalGames: this._leadboardModel.requestTotalGames(team.id, 'awayTeamId', requestMatches),
      totalVictories: this._leadboardModel.requestWins(team.id, 'awayTeamId', requestMatches),
      totalDraws: this._leadboardModel.requestDraws(team.id, 'awayTeamId', requestMatches),
      totalLosses: this._leadboardModel.requestLosses(team.id, 'awayTeamId', requestMatches),
      goalsFavor: this._leadboardModel
        .requestGoals(team.id, 'awayTeamId', requestMatches)?.goalsFavor,
      goalsOwn: this._leadboardModel
        .requestGoals(team.id, 'awayTeamId', requestMatches)?.goalsOwn,
      goalsBalance: this._leadboardModel.requestGoalsBalance(team.id, 'awayTeamId', requestMatches),
      efficiency: this._leadboardModel.requestEfficiency(team.id, 'awayTeamId', requestMatches),
    })));
    const result = this._leadboardModel.requestOrder(requestAllFields);
    return result;
  }

  async listLeadboard():Promise<ILeadboard[]> {
    const awayLeadboard = await this.listAwayLeadboard();
    const homeLeadboard = await this.listHomeLeadboard();
    return this._leadboardModel.requestOrder(homeLeadboard.map((a) => {
      const b = awayLeadboard.find((teamAway) => a.name === teamAway.name) as ILeadboard;
      return { name: a.name,
        totalPoints: Number(a.totalPoints) + Number(b.totalPoints),
        totalGames: Number(a.totalGames) + Number(b.totalGames),
        totalVictories: Number(a.totalVictories) + Number(b.totalVictories),
        totalDraws: Number(a.totalDraws) + Number(b.totalDraws),
        totalLosses: Number(a.totalLosses) + Number(b.totalLosses),
        goalsFavor: Number(a.goalsFavor) + Number(b.goalsFavor),
        goalsOwn: Number(a.goalsOwn) + Number(b.goalsOwn),
        goalsBalance: this._leadboardModel
          .balanceAll(a.goalsFavor, b.goalsFavor, a.goalsOwn, b.goalsOwn),
        efficiency: this._leadboardModel
          .efficiency(a.totalPoints, b.totalPoints, a.totalGames, b.totalGames),
      };
    }));
  }
}

export default LeadboardService;
