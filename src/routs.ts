import { IRout } from '..';
import AuthRouter from './auth/router';

export const routs: IRout[] = [
    {
        subdomain: 'auth.api',
        router: AuthRouter
    },
];
