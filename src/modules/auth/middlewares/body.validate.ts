import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import ApiError from '../../../lib/ApiError';
import LoginDto from '../dtos/login.dto';

export default class BodyValidate {

    async login(request: Request, response: Response, next: NextFunction) {
        const { login, password } = request.body;

        const dto = new LoginDto();
        dto.login = login;
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
