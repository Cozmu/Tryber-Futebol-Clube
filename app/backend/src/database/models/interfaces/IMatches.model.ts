interface IRequestScoreboard {
  awayTeamGoals:number;
  homeTeamGoals:number;
}

interface IMatches extends IRequestScoreboard {
  id:number;
  homeTeamId:number;
  awayTeamId:number;
  inProgress:boolean;
}

export { IRequestScoreboard };
export default IMatches;
