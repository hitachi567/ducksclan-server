import { Router } from 'express';
import AuthController from './controller';
import authCheckMiddleware from '../middlewares/auth-check.middleware';
import BodyValidate from './middlewares/body.validate';
import CookiesValidate from './middlewares/cookies.validate';
import RegistrationEndpoint from './middlewares/registration.endpoint';

const AuthRouter = Router();
const controller = new AuthController();
const bodyValidate = new BodyValidate();
const cookiesValidate = new CookiesValidate();


AuthRouter.put('/', RegistrationEndpoint.validator, RegistrationEndpoint.controller);
AuthRouter.post('/', bodyValidate.login, controller.login);
AuthRouter.post(
    '/refresh',
    cookiesValidate.checkRefreshCookie,
    controller.loginRefresh
);
AuthRouter.post(
    '/logout',
    authCheckMiddleware,
    controller.logout
);

export default AuthRouter;
