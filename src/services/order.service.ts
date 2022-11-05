import { IOrder } from '../interfaces/IOrder';
import OrderModel from '../models/order.model';

export default class OrderService {
  public order = new OrderModel();

  public getAll(): Promise<IOrder[]> {
    return this.order.getAll();
  }
}