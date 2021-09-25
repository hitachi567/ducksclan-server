import { NextFunction, Request, Response } from 'express';
import ApiError from '../../lib/ApiError';
import RegistrationService from '../registration.service';

export default class RegistrationEndpoint {
    static async validator(request: Request, response: Response, next: NextFunction) {
        const { email, username, password } = request.body;
        try {
            response.locals.email = RegistrationEndpoint.checkEmail(email);
            response.locals.username = RegistrationEndpoint.checkUsername(username);
            response.locals.password = RegistrationEndpoint.checkPassword(password);
            next();
        } catch (error) {
            next(error);
        }
    }

    static async controller(request: Request, response: Response, next: NextFunction) {
        const { username, email, password, fingerprint } = response.locals;
        const data = { username, email, password, fingerprint, ip: request.ip }
        try {
            const result = await RegistrationService.registration(data);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

    static checkUsername(username: string) {
        if (typeof username !== 'string') {
            throw ApiError.ValidateError('username must be string');
        }
        let string = username.trim();
        if (string.length < 3) {
            throw ApiError.ValidateError('username must be greater than or equal to 3');
        }
        if (string.length > 30) {
            throw ApiError.ValidateError('username must be less than or equal to 30');
        }
        if (string.match(/[^a-z0-9_]/gi)) {
            throw ApiError.ValidateError('username must contain only alphanumeric latin characters including underscore');
        }
        return string;
    }

    static checkPassword(password: string) {
        if (typeof password !== 'string') {
            throw ApiError.ValidateError('password must be string');
        }
        let string = password.trim();
        if (string.length < 3) {
            throw ApiError.ValidateError('password must be greater than or equal to 3');
        }
        if (string.length > 50) {
            throw ApiError.ValidateError('password must be less than or equal to 50');
        }
        return string;
    }

    static checkEmail(email: string) {
        if (typeof email !== 'string') {
            throw ApiError.ValidateError('email must be string');
        }
        let string = email.trim();
        return string;
    }

}