import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { IProduct } from '../interfaces/IProduct';
import mapError from '../utils/mapError';

export default class ProductController {
  public productService = new ProductService();

  async newProduct(req: Request<object, object, IProduct>, res: Response) {
    const productRegistered = await this.productService.newProduct(req.body);
    return res.status(mapError('CREATED')).json(productRegistered);
  }

  async getAll(_req: Request, res: Response) {
    const listProducts = await this.productService.getAll();
    return res.status(mapError('OK')).json(listProducts);
  }
}