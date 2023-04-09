import MatchesModel from '../../database/models/Matchers.model';

interface ILeadboardService {
  listHomeLeadboard():Promise<MatchesModel[]>
}

export default ILeadboardService;
