import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import mapError from '../utils/mapError';

export default class ProductController {
  public orderService = new OrderService();

  async getAll(_req: Request, res: Response) {
    const listOrders = await this.orderService.getAll();
    return res.status(mapError('OK')).json(listOrders);
  }
}