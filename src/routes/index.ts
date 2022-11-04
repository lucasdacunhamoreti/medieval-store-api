import { Router } from 'express';
import routerProduct from './product.route';

const router = Router();

router.use('/products', routerProduct);

export default router;