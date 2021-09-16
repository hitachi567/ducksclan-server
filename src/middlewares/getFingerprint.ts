import { NextFunction, Request, Response } from 'express';

function getFingerprint(requset: Request, response: Response, next: NextFunction) {
    response.locals.fingerprint = requset.fingerprint
        ? requset.fingerprint.hash
        : requset.ip;
    next();
}

export default getFingerprint;
