import IMatches from '../../database/models/interfaces/IMatches.model';

interface IMatchesService {
  getAll(InProgress:string):Promise<IMatches[]>,
  updatePatch(id:number): Promise<void>
}

export default IMatchesService;
