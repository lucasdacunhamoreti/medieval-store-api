import { ILogin } from '../interfaces/ILogin';
import SchemaLogin from './schemas/login.schema';

export default class ValidateUser {
  public schemaLogin = SchemaLogin;

  public validateLogin(userLogin: ILogin) {
    const result = this.schemaLogin.validate(userLogin);
    return result;
  }
}