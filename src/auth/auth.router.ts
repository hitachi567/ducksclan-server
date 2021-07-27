import { Router } from 'express';
import AuthController from './auth.controller';
import authCheckMiddleware from './middlewares/auth-check.middleware';
import BodyValidate from './middlewares/body.validate';
import CookiesValidate from './middlewares/cookies.validate';

const AuthRouter = Router();
const controller = new AuthController();
const bodyValidate = new BodyValidate();
const cookiesValidate = new CookiesValidate();

AuthRouter.post(
    '/registration/check',
    bodyValidate.registrationCheck,
    controller.registrationCheck
);
AuthRouter.put(
    '/registration',
    bodyValidate.registration,
    controller.registration
);
AuthRouter.post(
    '/registration/confirm',
    authCheckMiddleware,
    bodyValidate.registrationConfirm,
    controller.registrationConfirm
);

AuthRouter.post(
    '/login',
    bodyValidate.login,
    controller.login
);
AuthRouter.post(
    '/login/refresh',
    cookiesValidate.checkRefreshCookie,
    controller.loginRefresh
);
AuthRouter.post(
    '/logout',
    authCheckMiddleware,
    controller.logout
);

export default AuthRouter;
