import http from 'http';
import initExpressApp from './initExpressApp';
import Config from './Config';
// import { routs } from './routs';
import Log from './utils/Log';
import Database from './database/Database';
import UserDatabase from './database/user.database';
import UserService from './services/user.service';

export const config = new Config();
// Database.init();
const db = new UserDatabase();
const service = new UserService();


const app = initExpressApp(/* routs */);
const server = http.createServer(app);
server.listen(config.port, listener);

function listener() {
    Log.info(`Server started on http://localhost:${config.port}`);
}
