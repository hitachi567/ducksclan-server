import http from 'http';
import initExpressApp from './lib/initExpressApp';
import Config from './Config';
import Database from './database/Database';
import { routs } from './routs';
import Log from './lib/Log';
import getFingerprint from './middlewares/getFingerprint';
import express, { Router } from 'express';
import errorMiddleware from './middlewares/error.middleware';
import subdomain from './middlewares/subdomain';

export const config = new Config();
main().catch(Log.error);

async function main() {
    await Database.init();
    
    const app = initExpressApp();

    app.use(getFingerprint);
    if (routs) {
        for (const rout of routs) {
            app.use(subdomain(rout.router, rout.subdomain));
        }
    }
    app.use(express.static('static/public'));
    app.use(errorMiddleware);
    const server = http.createServer(app);
    server.listen(config.port, listener);
}

function listener() {
    Log.info(`Server started on http://localhost:${config.port}`);
}

export interface IRout {
    router: Router,
    subdomain?: string
}
