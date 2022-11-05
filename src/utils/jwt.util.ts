import dotenv from 'dotenv';
import Jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
// import HttpException from './http.exception';
// import mapError from './mapError';

dotenv.config();

export default class JwtUtil {
  jwt = Jsonwebtoken;

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
    const payload = this.jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    return payload;
  }
}
