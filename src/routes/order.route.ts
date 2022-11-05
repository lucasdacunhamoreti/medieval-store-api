import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const routerOrder = Router();

const orderController = new OrderController();

routerOrder.get('/', orderController.getAll.bind(orderController));

export default routerOrder;