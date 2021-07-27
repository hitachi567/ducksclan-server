import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ApiError from '../../utils/ApiError';
import RegistrationCheckDto from '../dtos/registration-check.dto';
import RegistrationDto from '../dtos/registration.dto';
import RegistrationConfirmDto from '../dtos/registration-confirm.dto';
import LoginDto from '../dtos/login.dto';

export default class BodyValidate {

    async registrationCheck(request: Request, response: Response, next: NextFunction) {
        const { email, username } = request.body;

        const dto = new RegistrationCheckDto();
        dto.email = email;
        dto.username = username;
        const errors = await validate(dto);

        if (errors.length === 0) {
            next();
        } else {
            const error = ApiError.handleValidationErrors(errors);
            next(error);
        }
    }

    async registration(request: Request, response: Response, next: NextFunction) {
        const { email, username, password, firstname } = request.body;

        const dto = new RegistrationDto();
        dto.email = email;
        dto.username = username;
        dto.password = password;
        dto.firstname = firstname;
        const errors = await validate(dto);

        if (errors.length === 0) {
            next();
        } else {
            const error = ApiError.handleValidationErrors(errors);
            next(error);
        }
    }

    async registrationConfirm(request: Request, response: Response, next: NextFunction) {
        const { code } = request.body;
        response.locals.user_id
        const dto = new RegistrationConfirmDto();
        dto.code = code;
        const errors = await validate(dto);

        if (errors.length === 0) {
            next();
        } else {
            const error = ApiError.handleValidationErrors(errors);
            next(error);
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;

        const dto = new LoginDto();
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
    
}
