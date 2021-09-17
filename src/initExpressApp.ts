import express, { Express, Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fingerprint from 'express-fingerprint';
import errorMiddleware from './middlewares/error.middleware';
import subdomain from './middlewares/subdomain';
import getFingerprint from './middlewares/getFingerprint';

export default function initExpressApp(routs?: IRout[]): Express {
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fingerprint());
    app.use(getFingerprint);
    if (routs) {
        for (const rout of routs) {
            app.use(subdomain(rout.router, rout.subdomain));
        }
    }
    app.use(express.static('static'));
    app.use(errorMiddleware);
    return app;
}

export interface IRout {
    router: Router,
    subdomain?: string
}
