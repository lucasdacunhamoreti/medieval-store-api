import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const routerLogin = Router();

const authController = new AuthController();

routerLogin.post('/', authController.login.bind(authController));

export default routerLogin;