import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fingerprint from 'express-fingerprint';

export default function initExpressApp() {
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fingerprint());
    return app;
}
