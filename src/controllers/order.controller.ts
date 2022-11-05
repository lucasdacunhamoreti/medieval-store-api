import { Request, Response } from 'express';
import { IExtendedRequest, IUserPayload } from '../interfaces/ILogin';
import OrderService from '../services/order.service';
import mapError from '../utils/mapError';

export default class ProductController {
  public orderService = new OrderService();

  async getAll(_req: Request, res: Response) {
    const listOrders = await this.orderService.getAll();
    return res.status(mapError('OK')).json(listOrders);
  }

  async newOrder(req: IExtendedRequest, res: Response) {
    const orderRegistered = await this.orderService.newOrder(req.body, req.user as IUserPayload);
    return res.status(mapError('CREATED')).json(orderRegistered);
  }
}