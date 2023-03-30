import IUserValidation from './interfaces/IUserValidations';

class UserValidation implements IUserValidation {
  validateEmail(email: string): void {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email)) {
      throw new Error('');
    }
  }
}

export default UserValidation;
