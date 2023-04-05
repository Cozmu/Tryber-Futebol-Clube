import ITeams from '../../database/models/interfaces/ITeams.model';

interface ITeamsValidation {
  validationTeam(team: ITeams | null): void
}

export default ITeamsValidation;
