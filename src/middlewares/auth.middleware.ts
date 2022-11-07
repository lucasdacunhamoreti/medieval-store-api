import { NextFunction, Response } from 'express';
import { IExtendedRequest, IUserPayload } from '../interfaces/ILogin';
import AuthService from '../services/auth.service';

export default class ValidateToken {
  public authService = new AuthService();

  public verifyAccess = async (req: IExtendedRequest, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization as string;
    
    const { id, username } = this.authService.verifyToken(token);
        
    req.user = { id, username } as IUserPayload;
    
    next();
  };
}