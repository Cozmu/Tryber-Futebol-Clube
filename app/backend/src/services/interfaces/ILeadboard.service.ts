import ILeadboard from '../../database/models/interfaces/ILeadboard.model';

interface ILeadboardService {
  listHomeLeadboard():Promise<ILeadboard[]>
}

export default ILeadboardService;
