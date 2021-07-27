import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fingerprint from 'express-fingerprint';
import errorMiddleware from './middlewares/error.middleware';
import { IRout } from './App';

export default class ExpressApp {
    protected app: express.Express;

    constructor(routs: IRout[]) {
        this.app = express();
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fingerprint());
        for (const rout of routs) {
            this.app.use(rout.path, rout.router)
        }
        this.app.use(errorMiddleware);
    }
}
