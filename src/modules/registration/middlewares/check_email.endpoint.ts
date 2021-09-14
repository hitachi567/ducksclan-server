import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ApiError from '../../../utils/ApiError';
import RegistrationService from '../../../services/registration.service';
import CheckEmailDto from '../dtos/check_email.dto';

export default class CheckEmailEndpoint {
    async validator(request: Request, response: Response, next: NextFunction) {
        const dto = new CheckEmailDto();
        dto.email = request.body.email;
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
        const error = await service.checkEmail(request.body.email);

        if (error) {
            return next(error);
        }

        response.status(200).send(request.body.email + ' is not taken');
        next();
    }
}
