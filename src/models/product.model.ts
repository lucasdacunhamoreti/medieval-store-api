import { ResultSetHeader, RowDataPacket } from 'mysql2';
import mysql from './connection';
import { IProduct } from '../interfaces/IProduct';

export default class ProductModel {
  private connection = mysql;

  public async newProduct(productData:IProduct): Promise<IProduct> {
    const { name, amount } = productData;
    
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...productData };
  }

  public async getAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<RowDataPacket[] & IProduct[]>(
      'SELECT * FROM Trybesmith.Products',
    );
    return result;
  }
}