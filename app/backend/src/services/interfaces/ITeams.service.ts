import ITeams from '../../database/models/interfaces/ITeams.model';

interface ITeamsService {
  getAll():Promise<ITeams[]>
  getById(id:number):Promise<ITeams | null>
}

export default ITeamsService;
