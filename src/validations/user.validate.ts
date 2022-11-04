import { IUser } from '../interfaces/IUser';
import SchemaUser from './schemas/user.schema';

export default class ValidateUser {
  public schemaUser = SchemaUser;

  public validateUser(user: IUser) {
    const result = this.schemaUser.validate(user);
    return result;
  }
}