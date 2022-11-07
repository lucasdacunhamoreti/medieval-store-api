import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const routerProduct = Router();

const productController = new ProductController();

routerProduct.post('/', productController.newProduct);
routerProduct.get(
  '/',
  productController.getAll,
);

export default routerProduct;