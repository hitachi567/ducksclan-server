import { NextFunction, Request, Response } from 'express';
import User from '../../../database/entities/User';
import RegistrationService from '../registration.service';

export default class RegistrationEndpoint {
    async validator(request: Request, response: Response, next: NextFunction) {
        const { email, username, password } = request.body;
        try {
            response.locals.email = User.checkEmail(email);
            response.locals.username = User.checkUsername(username);
            response.locals.password = User.checkPassword(password);
            next();
        } catch (error) {
            next(error);
        }
    }

    async controller(request: Request, response: Response, next: NextFunction) {
        const service = new RegistrationService();
        const { username, email, password, fingerprint } = response.locals;
        
        try {
            const result = await service.registration(username, email, password, fingerprint, request.ip);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
}