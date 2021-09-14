import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ApiError from '../../../utils/ApiError';
import RegistrationService from '../../../services/registration.service';
import CheckUsernameDto from '../dtos/check_username.dto';

export default class CheckUsernameEndpoint {
    async validator(request: Request, response: Response, next: NextFunction) {
        const dto = new CheckUsernameDto();
        dto.username = request.body.username;
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
        const error = await service.checkUsername(request.body.username);

        if (error) {
            return next(error);
        }

        response.status(200).send(request.body.username + ' is not taken');
        next();
    }
}
