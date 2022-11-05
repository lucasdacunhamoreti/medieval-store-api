import { RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IOrder } from '../interfaces/IOrder';

export default class OrderModel {
  private connection = mysql;

  public async getAll(): Promise<IOrder[]> {
    const [result] = await this.connection.execute<RowDataPacket[] & IOrder[]>(
      `
      SELECT orders.id, orders.userId, JSON_ARRAYAGG(products.id) AS productsIds
      FROM Trybesmith.Orders as orders
      INNER JOIN Trybesmith.Products as products
      ON orders.id = products.orderId
      GROUP BY orders.id, orders.userId
      `,
    );
    return result;
  }
}