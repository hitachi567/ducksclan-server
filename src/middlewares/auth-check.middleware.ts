import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import TokenService, { TokenPayload } from '../services/token.service';

function authCheckMiddleware(request: Request, response: Response, next: NextFunction) {
    const service = new TokenService();
    const token = request.headers.authorization || '';
    token.replace(/bearer /g, '');
    try {
        const payload = service.validateAccessToken(token);
        if (payload instanceof TokenPayload && payload.user_id && payload.fingerprint) {
            response.locals.user_id = payload.user_id;
            response.locals.warning = payload.fingerprint !== request.fingerprint?.hash;
            next();
        } else {
            next(ApiError.Unauthorized());
        }
    } catch (error) {
        next(ApiError.Unauthorized());
    }
}

export default authCheckMiddleware;
