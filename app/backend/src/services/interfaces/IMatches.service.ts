import IMatches from '../../database/models/interfaces/IMatches.model';

interface IMatchesService {
  getAll():Promise<IMatches[]>
}

export default IMatchesService;
