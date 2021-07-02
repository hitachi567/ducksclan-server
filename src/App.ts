import express from 'express';
import cors from 'cors';
import { createServer as createHTTPSServer } from 'https';
import { createServer as createHTTPServer } from 'http';
import { APP_PATH } from './utils/consts';
import authRouter from "./router/auth";
import fs from 'fs';
import path from 'path';
import Log from './utils/Log';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import makeDirctory from './utils/makeDirectory';
import Fingerprint from 'express-fingerprint';
import errorMiddleware from './errorMiddleware';
import profileRouter from './router/profile';

dotenv.config();
const port = process.env.port || 5000;
const isHTTPS = process.env.isHTTPS || false;
const sslPath = process.env.sslPath || path.resolve(__dirname, 'ssl');
const options = {
    key: fs.existsSync(path.resolve(sslPath, 'key.pem')) ?
        fs.readFileSync(path.resolve(sslPath, 'key.pem')) : undefined,
    cert: fs.existsSync(path.resolve(sslPath, 'key.pem')) ?
        fs.readFileSync(path.resolve(sslPath, 'cert.pem')) : undefined
}

export default class App {
    expressApp;
    httpServer;
    httpsServer;

    constructor() {
        this.expressApp = express();
        this.httpServer = createHTTPServer(this.expressApp);
        this.httpsServer = createHTTPSServer(options, this.expressApp);
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(cors());
        this.expressApp.use(Fingerprint())
        this.expressApp.use(express.static(path.resolve(APP_PATH, 'build')));
        this.expressApp.use('/api/auth', authRouter);
        this.expressApp.use('/api/profile', profileRouter);
        this.expressApp.get('/', (req, res) => {
            console.log(req.ip);

            res.sendFile(path.resolve(APP_PATH, 'build', 'index.html'));
        });

        this.expressApp.use(errorMiddleware);

    }

    listen() {
        try {
            if (isHTTPS === 'true') {
                this.httpsServer.listen(port, () => {
                    Log.info('Server started on https://localhost:' + port);
                });
            } else {
                this.httpServer.listen(port, () => {
                    Log.info('Server started on http://localhost:' + port);
                });
            }
        } catch (error) {
            Log.error(error);
        }
    }

    makeAppDirectory() {
        if (!fs.existsSync(APP_PATH)) {
            Log.warn('application directory not found');
            makeDirctory(APP_PATH);
        }
    }

}
