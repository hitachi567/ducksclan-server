import { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/ApiError';
import TokenService, { TokenPayload } from '../services/token.service';

function authCheckMiddleware(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization || '';
    token.replace(/bearer /g, '');
    try {
        const payload = TokenService.validateAccess(token);
        if (payload instanceof TokenPayload && payload.user_id && payload.fingerprint) {
            response.locals.user_id = payload.user_id;
            response.locals.warning = payload.fingerprint !== response.locals.fingerprint;
            next();
        } else {
            next(ApiError.Unauthorized());
        }
    } catch (error) {
        next(ApiError.Unauthorized());
    }
}

export default authCheckMiddleware;
