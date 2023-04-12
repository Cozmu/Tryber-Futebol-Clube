import { ModelStatic } from 'sequelize';
import ILeadboard from './interfaces/ILeadboard.model';
import MatchesModel from './Matchers.model';
import TeamsModel from './Teams.model';

class LeadboardModel {
  constructor(
    private _matchesModel:ModelStatic<MatchesModel>,
    private _teamsModel:ModelStatic<TeamsModel>,
  ) {}

  async findAllMatches():Promise<MatchesModel[]> {
    const request = await this._matchesModel.findAll({ where: { inProgress: false } });
    return request;
  }

  async findAllTeams():Promise<TeamsModel[]> {
    const request = await this._teamsModel.findAll();
    return request;
  }

  requestTotalGames = (teamId:number, awayOrHome:string, matches:MatchesModel[])
  :number | undefined => {
    if (awayOrHome === 'homeTeamId') {
      return matches.filter((e) => e.homeTeamId === teamId).length;
    }
    if (awayOrHome === 'awayTeamId') {
      return matches.filter((e) => e.awayTeamId === teamId).length;
    }
  };

  requestGoals = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      const goalsFavor = matches.map((match) => match.homeTeamId === teamId && match.homeTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      const goalsOwn = matches.map((match) => match.homeTeamId === teamId && match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return { goalsFavor, goalsOwn };
    }
    if (awayOrHome === 'awayTeamId') {
      const goalsFavor = matches.map((match) => match.awayTeamId === teamId && match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      const goalsOwn = matches.map((match) => match.awayTeamId === teamId && match.homeTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return { goalsFavor, goalsOwn };
    }
  };

  requestWins = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      return matches
        .map((match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);
    }
    if (awayOrHome === 'awayTeamId') {
      return matches
        .map((match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);
    }
  };

  requestLosses = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      return matches
        .map((match) => match.homeTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);
    }

    if (awayOrHome === 'awayTeamId') {
      return matches
        .map((match) => match.awayTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);
    }
  };

  requestDraws = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      return matches
        .map((match) => match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);
    }
    if (awayOrHome === 'awayTeamId') {
      return matches
        .map((match) => match.awayTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);
    }
  };

  requestGoalsBalance = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      const goals = this.requestGoals(teamId, awayOrHome, matches);
      return Number(goals?.goalsFavor) - Number(goals?.goalsOwn);
    }
    if (awayOrHome === 'awayTeamId') {
      const goals = this.requestGoals(teamId, awayOrHome, matches);
      return Number(goals?.goalsFavor) - Number(goals?.goalsOwn);
    }
  };

  balanceAll = (
    homeGoalsFavor:number | false | undefined,
    awayGoalsFavor:number | false | undefined,
    homeGoalsOwn:number | false | undefined,
    awayGoalsOwn:number | false | undefined,
  ) => {
    const goalsFavor = Number(homeGoalsFavor) + Number(awayGoalsFavor);
    const goalsOwn = Number(homeGoalsOwn) + Number(awayGoalsOwn);
    return goalsFavor - goalsOwn;
  };

  efficiency = (
    homePoints:number | undefined,
    awayPoints:number | undefined,
    homeGame:number | undefined,
    awayGame:number | undefined,
  ) => {
    const totalPoints = Number(homePoints) + Number(awayPoints);
    const totalGames = Number(homeGame) + Number(awayGame);
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  requestTotalPoints = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      const victories = this.requestWins(teamId, awayOrHome, matches);
      const draws = this.requestDraws(teamId, awayOrHome, matches);
      return Number(victories) * 3 + Number(draws);
    }
    if (awayOrHome === 'awayTeamId') {
      const victories = this.requestWins(teamId, awayOrHome, matches);
      const draws = this.requestDraws(teamId, awayOrHome, matches);
      return Number(victories) * 3 + Number(draws);
    }
  };

  requestEfficiency = (teamId:number, awayOrHome:string, matches:MatchesModel[]) => {
    if (awayOrHome === 'homeTeamId') {
      const totalGames = this.requestTotalGames(teamId, awayOrHome, matches);
      const totalPoints = this.requestTotalPoints(teamId, awayOrHome, matches);

      return ((Number(totalPoints) / (Number(totalGames) * 3)) * 100).toFixed(2);
    }
    if (awayOrHome === 'awayTeamId') {
      const totalGames = this.requestTotalGames(teamId, awayOrHome, matches);
      const totalPoints = this.requestTotalPoints(teamId, awayOrHome, matches);

      return ((Number(totalPoints) / (Number(totalGames) * 3)) * 100).toFixed(2);
    }
  };

  requestOrder = (allFields:ILeadboard[]) => {
    const result = allFields.sort((a:ILeadboard, b:ILeadboard) => {
      if (a.totalPoints !== b.totalPoints) {
        return Number(b.totalPoints) - Number(a.totalPoints);
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return Number(b.goalsBalance) - Number(a.goalsBalance);
      }
      return Number(b.goalsFavor) - Number(a.goalsFavor);
    });
    return result;
  };
}

export default LeadboardModel;
