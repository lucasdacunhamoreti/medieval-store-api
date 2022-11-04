import { IProduct } from '../interfaces/IProduct';
import SchemaProduct from './schemas/product.schema';

export default class ValidateProduct {
  public schemaProduct = SchemaProduct;

  public validateProduct(product: IProduct) {
    const result = this.schemaProduct.validate(product);
    return result;
  }
}