import { RowDataPacket } from 'mysql2';
import mysql from './connection';
import { ILogin } from '../interfaces/ILogin';

export default class UserModel {
  private connection = mysql;

  public async getUser(userLogin: ILogin): Promise<ILogin> {
    const { username, password } = userLogin;
    
    const [[rows]] = await this.connection.execute<(
    RowDataPacket[] & ILogin[])>(
      'SELECT id, username, password FROM Trybesmith.Users WHERE username = ? AND password = ?', 
      [username, password],
      );
    
    return rows;
  }
}