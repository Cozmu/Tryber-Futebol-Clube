import NotFoundError from '../errors/not-found-error';
import ITeams from '../database/models/interfaces/ITeams.model';
import ITeamsValidation from './interfaces/ITeamsValidation';

class TeamsValidation implements ITeamsValidation {
  validationTeam = (team: ITeams | null):void => {
    if (team === null) {
      throw new NotFoundError('Team not found');
    }
  };
}

export default TeamsValidation;
