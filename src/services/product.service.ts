import { IProduct } from '../interfaces/IProduct';
import ProductModel from '../models/product.model';
import ValidateProduct from '../validations/product.validate';
import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';

export default class ProductService {
  public product = new ProductModel();

  public validateProduct = new ValidateProduct();

  public newProduct(product: IProduct): Promise<IProduct> {
    const { error } = this.validateProduct.validateProduct(product);
    
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
    
    return this.product.newProduct(product);
  }

  public getAll(): Promise<IProduct[]> {
    return this.product.getAll();
  }
}