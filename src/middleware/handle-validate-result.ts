import { validationResult } from 'express-validator';
import { Middleware, ApiError } from '@hitachi567/core';

export default function handleValidateResult(): Middleware {
    return (request, response, next) => {

        let result = validationResult(request);

        if (!result.isEmpty()) {
            let errors = result.array();
            let error = ApiError.BadRequest(errors[0].msg, errors);
            return next(error);
        }

        next();

    }
}
