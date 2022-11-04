import { Router } from 'express';
import UserController from '../controllers/user.controller';

const routerUser = Router();

const userController = new UserController();

routerUser.post('/', userController.newUser.bind(userController));

export default routerUser;