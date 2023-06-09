import InvalidFieldsError from '../errors/invalide-fields-error';
import NotFoundError from '../errors/not-found-error';
import IMatches from '../database/models/interfaces/IMatches.model';
import IMatchesValidate from './interfaces/IMatchesValidation';
import InvalidParamError from '../errors/invalide-params-error';

class MatchesValidate implements IMatchesValidate {
  checkIfTheMatchExists = (matche:IMatches | null):void => {
    if (matche === null) {
      throw new NotFoundError('Match not found');
    }
    this.checkIfItIsAGameInProgress(matche);
  };

  checkUpdate = (affectedRows:number):void => {
    if (affectedRows === 0) {
      throw new NotFoundError('Match not found or already finished');
    }
  };

  checkIfItIsAGameInProgress = (matche:IMatches):void => {
    if (matche.inProgress === false) {
      throw new InvalidParamError('Match already finished');
    }
  };

  checkIfTeamsAreEqual = (awayTeamId:number, homeTeamId:number):void => {
    if (awayTeamId === homeTeamId) {
      throw new InvalidFieldsError('It is not possible to create a match with two equal teams');
    }
  };
}

export default MatchesValidate;
