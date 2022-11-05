import { NextFunction, Response } from 'express';
import { IExtendedRequest, IUserPayload } from '../interfaces/ILogin';
import AuthService from '../services/auth.service';

export default class ValidateToken {
  public authService = new AuthService();

  async tokenValidate(req: IExtendedRequest, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization as string;
    
    const payload = this.authService.verifyToken(token);
    
    const { id, username } = payload;
    
    req.user = { id, username } as IUserPayload;
    
    next();
  }
}