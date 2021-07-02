import { NextFunction, Response, Request } from 'express';
import TokenService from './service/TokenService';
import CustomError from './utils/CustomError';
import Log from './utils/Log';

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const user_id = new TokenService().validateAccessToken(request.headers.authorization || '');
    if (user_id) {
        response.locals.user_id = user_id;
        next();
    } else {
        next(CustomError.Unauthorized());
    }
}