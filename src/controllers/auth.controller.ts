import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { ILogin } from '../interfaces/ILogin';
import mapError from '../utils/mapError';

export default class Login {
  public authService = new AuthService();

  async login(req: Request<object, object, ILogin>, res: Response) {
    const token = await this.authService.login(req.body);
    
    return res.status(mapError('OK')).json({ token });
  }
}