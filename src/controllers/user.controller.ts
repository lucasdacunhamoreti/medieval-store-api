import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { IUser } from '../interfaces/IUser';
import mapError from '../utils/mapError';

export default class UserController {
  public userService = new UserService();

  async newUser(req: Request<object, object, IUser>, res: Response) {
    const token = await this.userService.newUser(req.body);
    
    return res.status(mapError('CREATED')).json({ token });
  }
}