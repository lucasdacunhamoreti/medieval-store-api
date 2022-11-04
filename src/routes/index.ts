import { Router } from 'express';
import routerProduct from './product.route';
import routerUser from './user.route';

const router = Router();

router.use('/products', routerProduct);
router.use('/users', routerUser);

export default router;