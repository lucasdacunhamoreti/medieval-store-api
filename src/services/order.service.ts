import { IOrder, IProductsId } from '../interfaces/IOrder';
import OrderModel from '../models/order.model';
import ValidateOrder from '../validations/order.validate';
import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';
import { IUserPayload } from '../interfaces/ILogin';

export default class OrderService {
  public order = new OrderModel();

  public validateOrder = new ValidateOrder();

  public getAll(): Promise<IOrder[]> {
    return this.order.getAll();
  }

  public newOrder(orderData: IProductsId, userData: IUserPayload): Promise<IProductsId> {
    const { error } = this.validateOrder.validateOrder(orderData);
    
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
    
    return this.order.newOrder(orderData, userData);
  }
}