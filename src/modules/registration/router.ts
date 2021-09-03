import { Router } from 'express';
import authCheckMiddleware from '../../middlewares/auth-check.middleware';
import CheckEmailEndpoint from './middlewares/check_email.endpoint';
import CheckUsernameEndpoint from './middlewares/check_username.endpoint';
import ConfirmEndpoint from './middlewares/confirm.endpoint';
import RegistrationEndpoint from './middlewares/registration.endpoint';

const RegistrationRouter = Router();

let checkEmail = new CheckEmailEndpoint();
RegistrationRouter.get(
    '/check/email',
    checkEmail.validator,
    checkEmail.controller
);

let checkUsername = new CheckUsernameEndpoint();
RegistrationRouter.get(
    '/check/username',
    checkUsername.validator,
    checkUsername.controller
);

let registration = new RegistrationEndpoint()
RegistrationRouter.put(
    '/',
    registration.validator,
    registration.controller
);

RegistrationRouter.get(
    '/go',
    (req, res) => {
        res.send(req.ip + '1')
    }
);

let confirm = new ConfirmEndpoint();
RegistrationRouter.post(
    '/confirm',
    authCheckMiddleware,
    confirm.validator,
    confirm.controller
);

export default RegistrationRouter;
