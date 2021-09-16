import http from 'http';
import initExpressApp from './initExpressApp';
import Config from './Config';
import Database from './database/Database';
import { routs } from './routs';
import Log from './utils/Log';
import UserService from './services/user.service';
import UserDatabase from './database/user.database';

export const config = new Config();
export const database = new Database();
Database.createTables().then(main).catch(Log.error);

function main() {
    // Database.deleteTables()
    // UserDatabase.getInstance().then(db => {
    //     db.findAll().then(data => {
    //         console.log(data.rows)
    //     })
    // })

    const app = initExpressApp(routs);
    const server = http.createServer(app);
    server.listen(config.port, listener);
}

function listener() {
    Log.info(`Server started on http://localhost:${config.port}`);
}
