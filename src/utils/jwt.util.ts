import dotenv from 'dotenv';
import Jsonwebtoken from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';

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
}
