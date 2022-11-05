import { Router } from 'express';
import routerProduct from './product.route';
import routerUser from './user.route';
import routerLogin from './auth.route';
import routerOrder from './order.route';

const router = Router();

router.use('/products', routerProduct);
router.use('/users', routerUser);
router.use('/login', routerLogin);
router.use('/orders', routerOrder);

export default router;