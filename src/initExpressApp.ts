import express, { Express, Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fingerprint from 'express-fingerprint';
import errorMiddleware from './middlewares/error.middleware';
import subdomain from './middlewares/subdomain';
import { resolve } from 'path';

export default function initExpressApp(routs?: IRout[]): Express {
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fingerprint());
    app.get('/', (req, res) => {
        res.sendFile(resolve('./static/index.html'));
    });
    if (routs) {
        for (const rout of routs) {
            if (rout.subdomain) {
                app.use(subdomain(rout.subdomain, rout.router))
            } else {
                app.use(rout.path, rout.router)
            }
        }
    }    
    app.use(errorMiddleware);
    return app;
}

export interface IRout {
    subdomain?: string,
    path: string,
    router: Router
}
