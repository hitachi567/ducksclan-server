import { Router } from 'express';
import { EmailRegistrationRouter } from './registration';

export const AuthRouter = Router()
    .use('/email', EmailRegistrationRouter)
