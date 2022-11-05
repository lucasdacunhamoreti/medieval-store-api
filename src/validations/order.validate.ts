import { IProductsId } from '../interfaces/IOrder';
import SchemaOrder from './schemas/order.schema';

export default class ValidateOrder {
  public schemaOrder = SchemaOrder;

  public validateOrder(orderData: IProductsId) {
    const result = this.schemaOrder.validate(orderData);
    return result;
  }
}