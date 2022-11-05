// import jsonwebtoken from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';
import AuthModel from '../models/auth.model';
import ValidateLogin from '../validations/login.validate';
import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';
import JwtUtil from '../utils/jwt.util';

export default class AuthService {
  public auth = new AuthModel();

  public jwt = new JwtUtil();

  public validateLogin = new ValidateLogin();

  public async login(userLogin: ILogin): Promise<string> {
    const { error } = this.validateLogin.validateLogin(userLogin);
    
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

    const userData = await this.auth.getUser(userLogin);
    
    if (!userData) {
      throw new HttpException(mapError('UNAUTHORIZED'), 'Username or password invalid');
    }
    
    return this.jwt.generateToken(userData);
  }

  public verifyToken(token: string): ILogin {
    if (!token || token.length === 0) {
      throw new HttpException(mapError('UNAUTHORIZED'), 'Token not found');
    }

    const payload = this.jwt.validateToken(token) as ILogin;
    console.log(payload, 'tomate');
    
    return payload;
  }
}