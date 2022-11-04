import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/user.model';
import ValidateUser from '../validations/user.validate';
import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';

export default class UserService {
  public user = new UserModel();

  public jwt = jsonwebtoken;

  public validateUser = new ValidateUser();

  public async newUser(user: IUser): Promise<string> {
    const { error } = this.validateUser.validateUser(user);
    
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

    const userRegistered = await this.user.newUser(user);

    const token = this.generateToken(userRegistered);
    
    return token;
  }

  public generateToken(user: IUser): string {
    const payload = { id: user.id, username: user.username }; 
    return this.jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  }
}