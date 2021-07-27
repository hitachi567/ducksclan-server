import { ValidationError } from 'class-validator';

export type TInitialError = Error | ApiError | ValidationError | ValidationError[];

export default class ApiError {
    type: 'validation error' | 'client error' | 'server error';
    status: number;
    messages: string[] = [];
    initialError?: TInitialError;

    static BadRequest() {
        let error = new ApiError();
        error.status = 400;
        return error;
    }

    static InternalServerError() {
        let error = new ApiError();
        error.type = 'server error';
        error.status = 500;
        error.messages = ['Internal Server Error'];
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
        error.type = 'validation error';
        error.messages = messages;
        error.initialError = errors;

        return error;
    }

    static Unauthorized(message?: string) {
        let error = ApiError.BadRequest();
        error.type = 'client error';
        error.status = 401;
        error.messages = [message || 'Unauthorized'];
        return error;
    }


    // static handleServerError(error: any) {
    //     if (error instanceof ApiError) {
    //         return error;
    //     } else if (error instanceof Error) {
    //         return new ApiError('server error', error.message, error.stack, error);
    //     } else {
    //         return new ApiError('other error', 'Internal Server Error', undefined, error);
    //     }
    // }
}
