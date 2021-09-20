import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ApiError from '../../../lib/ApiError';
import LoginDto from '../dtos/login.dto';

export default class CookiesValidate {

    checkRefreshCookie(request: Request, response: Response, next: NextFunction) {
        const { refreshToken } = request.cookies;

        if (refreshToken && typeof refreshToken === 'string') {
            next();
        } else {
            ApiError.Unauthorized();
        }
    }
    
}
