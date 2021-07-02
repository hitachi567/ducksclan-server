import { Router } from 'express';
import { AUTH_ROUTS } from '../utils/consts';
import AuthController from '../controllers/auth';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(AUTH_ROUTS.signUp, authController.signUpValidation, authController.signUp);
authRouter.post(AUTH_ROUTS.signIn, authController.signInValidation, authController.signIn);
authRouter.post(AUTH_ROUTS.signOut, authController.checkCookie, authController.signOut);
authRouter.get(AUTH_ROUTS.activate, authController.activate);
authRouter.get(AUTH_ROUTS.refresh, authController.checkCookie, authController.refresh);

export default authRouter;
