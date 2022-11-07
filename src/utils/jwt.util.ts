import dotenv from 'dotenv';
import Jsonwebtoken from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import HttpException from './http.exception';
import mapError from './mapError';
//
dotenv.config();

export default class JwtUtil {
  public jwt = Jsonwebtoken;

  public generateToken(userData: ILogin | IUser): string {
    const { id, username } = userData;
        
    const payload = { id, username }; 
    return this.jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  }

  public validateToken(token: string) {
    try {
      const payload = this.jwt.verify(token, process.env.JWT_SECRET as string);
      return payload;
    } catch (error) {
      throw new HttpException(mapError('UNAUTHORIZED'), 'Invalid token');
    }
  }
}
