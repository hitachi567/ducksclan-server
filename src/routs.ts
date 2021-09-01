import { IRout } from './initExpressApp';
import AuthRouter from './modules/auth/router';
import RegistrationRouter from './modules/registration/router';

export const routs: IRout[] = [
    {
        subdomain: 'auth.api',
        path: '/',
        router: AuthRouter
    }, {
        subdomain: 'registration.api',
        path: '/',
        router: RegistrationRouter
    }
];
