import { Router } from 'express';
import routerProduct from './product.route';
import routerUser from './user.route';
import routerLogin from './auth.route';

const router = Router();

router.use('/products', routerProduct);
router.use('/users', routerUser);
router.use('/login', routerLogin);

export default router;