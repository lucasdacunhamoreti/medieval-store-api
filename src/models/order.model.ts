import { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IOrder, IProductsId } from '../interfaces/IOrder';
import { IUserPayload } from '../interfaces/ILogin';
import { IProduct } from '../interfaces/IProduct';

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

  public async newOrder(product:IProductsId, userData: IUserPayload): Promise<IProductsId> {
    const { productsIds } = product;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userData.id],
    );

    await Promise.all(productsIds.map(async (id) => {
      const [[result]] = await this.connection.execute<RowDataPacket[] & IProduct[]>(
        'SELECT * FROM Trybesmith.Products WHERE id = ?',
        [id],
      );
    
      await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES (?, ?, ?)',
        [result.name, result.amount, insertId],
      );
    }));

    console.log(userData.id);
    
    return { userId: userData.id, productsIds };
  }
}