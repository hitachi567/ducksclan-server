import ExpressApp from './ExpressApp';
import Log from './utils/Log';
import http from 'http';
import https from 'https';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import express from 'express';
import { v4 } from 'uuid';

export default class App extends ExpressApp {
    protected httpServer: http.Server;
    protected httpsServer: https.Server;
    protected config: IAppConfig;

    constructor(options: {
        config?: IAppConfig,
        routs?: IRout[],
    }) {
        super(options.routs || []);
        this.config = options.config || getConfig();
    }

    listen() {
        const { host, port, isHTTPS, ssl } = this.config;
        try {
            if (isHTTPS && ssl) {
                this.httpsServer = https.createServer(ssl, this.app);
                this.httpsServer.listen(port, () => {
                    Log.info(`Server started on https://${host}:${port}`);
                });
            } else {
                this.httpServer = http.createServer(this.app);
                this.httpServer.listen(port, () => {
                    Log.info(`Server started on http://${host}:${port}`);
                });
            }
        } catch (error) {
            Log.error(error);
        }
    }
}

export interface IAppConfig {
    isHTTPS: boolean,
    host: string,
    port: string | number,
    databasePath: string,
    JWT_access_secret: string,
    JWT_refresh_secret: string,
    ssl?: {
        key: Buffer | string,
        cert: Buffer | string
    }
}

export interface IRout {
    path: string,
    router: express.Router
}

export function getConfig(): IAppConfig {
    config();
    let result: IAppConfig = {
        host: process.env.host || 'localhost',
        port: process.env.port || 5000,
        isHTTPS: process.env.isHTTPS === 'true' || false,
        databasePath: process.env.databasePath || './database.sqlite',
        JWT_access_secret: process.env.JWT_access_secret || v4(),
        JWT_refresh_secret: process.env.JWT_refresh_secret || v4()
    };

    const sslExist =
        existsSync(resolve('./ssl', 'key.pem')) &&
        existsSync(resolve('./ssl', 'cert.pem'));
    if (result.isHTTPS && sslExist) {
        result.ssl = {
            key: readFileSync(resolve('./ssl', 'key.pem')),
            cert: readFileSync(resolve('./ssl', 'cert.pem'))
        }
    }

    return result;
}
