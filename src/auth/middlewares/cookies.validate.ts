import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ApiError from '../../utils/ApiError';
import RegistrationCheckDto from '../dtos/registration-check.dto';
import RegistrationDto from '../dtos/registration.dto';
import RegistrationConfirmDto from '../dtos/registration-confirm.dto';
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
