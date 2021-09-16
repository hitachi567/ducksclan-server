import { Router } from 'express';
import authCheckMiddleware from '../../middlewares/auth-check.middleware';
import ConfirmEndpoint from './middlewares/confirm.endpoint';
import RegistrationEndpoint from './middlewares/registration.endpoint';

let registration = new RegistrationEndpoint();
let confirm = new ConfirmEndpoint();
const RegistrationRouter = Router();
RegistrationRouter.get('/', (req, res) => res.send([
    {
        method: 'put',
        description: 'registration endpoint',
        body: {
            email: 'string',
            username: 'string',
            password: 'string'
        }
    }, {
        method: 'post',
        description: 'confirm endpoint',
        body: {
            code: 'string'
        }
    }
]));
RegistrationRouter.put('/', registration.validator, registration.controller);
RegistrationRouter.post('/', authCheckMiddleware, confirm.validator, confirm.controller);

export default RegistrationRouter;
