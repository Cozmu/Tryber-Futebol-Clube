import IMatcher from '../../database/models/interfaces/IMatcher.model';

interface IMatcherService {
  getAll():Promise<IMatcher[]>
}

export default IMatcherService;
