import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const routerOrder = Router();

const orderController = new OrderController();
const authMiddleware = new AuthMiddleware();

routerOrder.get('/', orderController.getAll.bind(orderController));
routerOrder.post(
  '/',
  authMiddleware.tokenValidate.bind(authMiddleware),
  orderController.newOrder.bind(orderController),
);

export default routerOrder;