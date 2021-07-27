import App, { getConfig, IRout } from './App';
import AuthRouter from './auth/auth.router';
import Database from './database/Database';

export const config = getConfig();
export const db = Database.init(config.databasePath);

const routs: IRout[] = [
    {
        path: '/api/auth/',
        router: AuthRouter
    }
];
const app = new App({ routs, config });
app.listen();
