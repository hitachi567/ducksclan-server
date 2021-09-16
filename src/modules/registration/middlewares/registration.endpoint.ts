import { NextFunction, Request, Response } from 'express';
import RegistrationService from '../../../services/registration.service';
import UserService from '../../../services/user.service';

export default class RegistrationEndpoint {
    async validator(request: Request, response: Response, next: NextFunction) {
        const service = new UserService();
        const { email, username, password } = request.body;
        try {
            response.locals.email = service.checkEmail(email);
            response.locals.username = service.checkUsername(username);
            response.locals.password = service.checkPassword(password);
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