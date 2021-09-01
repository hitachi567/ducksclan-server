import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import RegistrationDto from '../dtos/registration.dto';
import ApiError from '../../../utils/ApiError';
import RegistrationService from '../../../services/registration.service';

export default class RegistrationEndpoint {
    async validator(request: Request, response: Response, next: NextFunction) {
        const { email, username, password } = request.body;

        const dto = new RegistrationDto();
        dto.email = email;
        dto.username = username;
        dto.password = password;
        const errors = await validate(dto);

        if (errors.length === 0) {
            next();
        } else {
            const error = ApiError.handleValidationErrors(errors);
            next(error);
        }
    }

    async controller(request: Request, response: Response, next: NextFunction) {
        const service = new RegistrationService();

        const { email, username, password } = request.body;
        const fingerprint = request.fingerprint ? request.fingerprint.hash : request.ip;

        const result = await service.registration(username, email, password, fingerprint);

        if (result instanceof ApiError) {
            return next(result);
        }

        response.status(200).send(result);
        next();
    }
}