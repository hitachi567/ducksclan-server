import { NextFunction, Request, Response } from 'express';
import Generator from '../lib/Generator';

function getFingerprint(requset: Request, response: Response, next: NextFunction) {
    if (requset.fingerprint) {
        response.locals.fingerprint = requset.fingerprint.hash;
    } else if (requset.cookies.id) {
        response.locals.fingerprint = requset.cookies.id;
    } else {
        response.locals.fingerprint = Generator.generateSequense(32);
    }
    response.cookie('id', response.locals.fingerprint, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    next();
}

export default getFingerprint;
