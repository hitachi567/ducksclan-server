import { Router } from 'express';
import { resolve } from 'path';
import { IRout } from './initExpressApp';
import AuthRouter from './modules/auth/router';
import RegistrationRouter from './modules/registration/router';

export const routs: IRout[] = [

    /* {
        subdomain: 'auth.api',
        path: '/',
        router: AuthRouter
    }, */
    /* {
        router: Router().get('/', (req, res) => {
            res.sendFile(resolve('./static/index.html'));
        })
    }, */ {
        subdomain: 'registration.api',
        router: RegistrationRouter
    },
];
