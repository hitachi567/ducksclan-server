import { NextFunction, Request, Response } from 'express';
import ApiError from '../../utils/ApiError';
import TokenService from '../services/token.service';

function authCheckMiddleware(request: Request, response: Response, next: NextFunction) {
    const service = new TokenService();
    const token = request.headers.authorization || '';
    token.replace(/bearer /g, '');
    const user_id = service.validateAccessToken(token);
    if (user_id) {
        response.locals.user_id = user_id;
        next();
    } else {
        next(ApiError.Unauthorized());
    }
}

export default authCheckMiddleware;
