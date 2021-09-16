import { ValidationError } from 'class-validator';

export type TInitialError = Error | ApiError | ValidationError | ValidationError[];
enum TypesApiError {
    validation = 'validation error',
    client = 'client error',
    server = 'server error'
}

export default class ApiError {
    type: TypesApiError;
    status: number;
    messages: string[] = [];
    initialError?: TInitialError;


    static Unauthorized(message?: string) {
        let error = new ApiError();
        error.status = 401;
        error.type = TypesApiError.client;
        error.messages = [message || 'Unauthorized'];
        return error;
    }

    static BadRequest(message?: string) {
        let error = new ApiError();
        error.status = 400;
        error.type = TypesApiError.client;
        error.messages = [message || 'Bad Request'];
        return error;
    }

    static InternalServerError() {
        let error = new ApiError();
        error.type = TypesApiError.server;
        error.status = 500;
        error.messages = ['Internal Server Error'];
        return error;
    }

    static ValidateError(message: string) {
        let error = ApiError.BadRequest(message);
        error.type = TypesApiError.validation;
        return error;
    }

    static handleValidationErrors(errors: ValidationError[]) {
        // getting messages from validation error instance
        let messages: string[] = [];
        for (const error of errors) {
            if (error.constraints) {
                const keys = Object.keys(error.constraints).reverse();
                if (keys.length > 0) {
                    const message = error.constraints[keys[0]];
                    messages.push(message);
                }
            }
        }
        // set messages to error
        let error = ApiError.BadRequest();
        error.type = TypesApiError.validation;
        error.messages = messages;
        error.initialError = errors;

        return error;
    }

    static handleServerError(error: any) {
        if (error instanceof ApiError) {
            return error;
        } else {
            return ApiError.InternalServerError();
        }
    }
}
