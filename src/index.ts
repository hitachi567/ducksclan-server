import http from 'http';
import initExpressApp from './initExpressApp';
import Config from './Config';
import Database from './database/Database';
import { routs } from './routs';
import Log from './utils/Log';

export const config = new Config();
export const database = new Database();
main().catch(Log.error);

async function main() {
    await Database.createTables();

    const app = initExpressApp(routs);
    const server = http.createServer(app);
    server.listen(config.port, listener);
}

function listener() {
    Log.info(`Server started on http://localhost:${config.port}`);
}
