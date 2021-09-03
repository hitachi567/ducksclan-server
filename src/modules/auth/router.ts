import { Router } from 'express';
import AuthController from './controller';
import authCheckMiddleware from '../../middlewares/auth-check.middleware';
import BodyValidate from './middlewares/body.validate';
import CookiesValidate from './middlewares/cookies.validate';

const AuthRouter = Router();
const controller = new AuthController();
const bodyValidate = new BodyValidate();
const cookiesValidate = new CookiesValidate();
AuthRouter.get(
    '/go',
    (req, res) => {
        res.send(req.ip + '2')
    }
);
AuthRouter.post(
    '/login',
    bodyValidate.login,
    controller.login
);
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
