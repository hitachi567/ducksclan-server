import http from 'http';
import initExpressApp from './initExpressApp';
import Config from './Config';
import Database from './database/Database';
import { routs } from './routs';
import Log from './lib/Log';

Log.restart();
export const config = new Config();
export const database = new Database();
main().catch(Log.error);

async function main() {
    await database.authenticate();
    await database.sync();

    const app = initExpressApp(routs);
    const server = http.createServer(app);
    server.listen(config.port, listener);
}

function listener() {
    Log.info(`Server started on http://localhost:${config.port}`);
}
