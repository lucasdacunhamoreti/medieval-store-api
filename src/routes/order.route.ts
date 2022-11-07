import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const routerOrder = Router();

const orderController = new OrderController();
const authMiddleware = new AuthMiddleware();

routerOrder.get('/', orderController.getAll);
routerOrder.post(
  '/',
  authMiddleware.verifyAccess,
  orderController.newOrder,
);

export default routerOrder;