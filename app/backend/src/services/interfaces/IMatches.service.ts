import IMatches, {
  IRequestScoreboard,
  INewMatcherRequest,
} from '../../database/models/interfaces/IMatches.model';

interface IMatchesService {
  getAll(InProgress:string):Promise<IMatches[]>,
  updateMatchesProgression(id:number): Promise<number | void>,
  getMatchesById(id:number): Promise<void>,
  updateMatchesScore(id:number, body:IRequestScoreboard): Promise<void>
  insertNewMatcher(newMatche: INewMatcherRequest): Promise<IMatches>
}

export default IMatchesService;
