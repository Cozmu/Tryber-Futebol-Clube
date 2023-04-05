import IMatches from '../../database/models/interfaces/IMatches.model';

interface IMatchesValidate {
  checkIfTheMatchExists(matche:IMatches | null):void,
  checkIfItIsAGameInProgress(matche:IMatches):void,
  checkUpdate(affectedRows:number):void,
  checkIfTeamsAreEqual(awayTeamId:number, homeTeamId:number):void
}

export default IMatchesValidate;
