import IMatches, { IRequestScoreboard } from '../../database/models/interfaces/IMatches.model';

interface IMatchesService {
  getAll(InProgress:string):Promise<IMatches[]>,
  updateMatchProgression(id:number): Promise<number | void>,
  updateMatchScore(id:number, body:IRequestScoreboard): Promise<void>
}

export default IMatchesService;
