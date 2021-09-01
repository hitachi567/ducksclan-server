import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ConfirmDto from '../dtos/confirm.dto';
import ApiError from '../../../utils/ApiError';
import RegistrationService from '../../../services/registration.service';

export default class ConfirmEndpoint {
    async validator(request: Request, response: Response, next: NextFunction) {
        const dto = new ConfirmDto();
        dto.code = request.body.code;
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
        const result = service.confirm(request.body.code);

        if (result instanceof ApiError) {
            return next(result);
        }
    }
}