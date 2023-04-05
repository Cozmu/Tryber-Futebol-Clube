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

type INewMatcherRequest = Omit<IMatches, 'id' | 'inProgress'>;

export { IRequestScoreboard, INewMatcherRequest };
export default IMatches;
