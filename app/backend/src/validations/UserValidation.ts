import InvalidParamError from '../errors/invalide-params-error';
import IUserValidation from './interfaces/IUserValidations';

class UserValidation implements IUserValidation {
  validateFields = (email:string, password:string):void => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email) || password.length < 6) {
      throw new InvalidParamError('Invalid email or password');
    }
  };
}

export default UserValidation;
