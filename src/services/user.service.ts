import { IUser } from '../interfaces/IUser';
import UserModel from '../models/user.model';
import ValidateUser from '../validations/user.validate';
import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';
import JwtUtil from '../utils/jwt.util';

export default class UserService {
  public user = new UserModel();

  public jwt = new JwtUtil();

  public validateUser = new ValidateUser();

  public async newUser(userData: IUser): Promise<string> {
    const { error } = this.validateUser.validateUser(userData);
    
    if (error) {
      const typeMessage = error.details[0].type;
      const errorMessage = error.details[0].message;
      switch (typeMessage) {
        case 'any.required':
          throw new HttpException(mapError('BAD_REQUEST'), errorMessage);
        case 'string.empty':
          throw new HttpException(mapError('BAD_REQUEST'), errorMessage);
        default:
          throw new HttpException(mapError('UNPROCESSABLE'), errorMessage);
      }
    }

    const userRegistered = await this.user.newUser(userData);

    return this.jwt.generateToken(userRegistered);
  }
}