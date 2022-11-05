import { Request } from 'express';

export interface ILogin {
  id?:number;
  username: string;
  password?: string;
}

export interface IUserPayload {
  id: number;
  username: string;
}

export interface IExtendedRequest extends Request {
  user?: IUserPayload
}
