import IMatches from '../../database/models/interfaces/IMatches.model';

interface IMatchesService {
  getAll(InProgress:string):Promise<IMatches[]>
}

export default IMatchesService;
