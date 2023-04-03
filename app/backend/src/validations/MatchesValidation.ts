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

  checkIfItIsAGameInProgress = (matche:IMatches):void => {
    if (matche.inProgress === false) {
      throw new InvalidParamError('Match already finished');
    }
  };
}

export default MatchesValidate;
