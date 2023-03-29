import ITeams from '../../database/models/interfaces/ITeams.model';

interface ITeamsService {
  getAll():Promise<ITeams[]>
}

export default ITeamsService;
