interface ILeadboard {
  name: string,
  totalPoints: number | undefined,
  totalGames: number | undefined,
  totalVictories: number | undefined,
  totalDraws: number,
  totalLosses: number | undefined,
  goalsFavor: number | false | undefined,
  goalsOwn: number | false | undefined,
  goalsBalance: number | undefined,
  efficiency: string | number | undefined,
}

export default ILeadboard;
