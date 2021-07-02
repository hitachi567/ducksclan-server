

export default class CustomError extends Error {
    type: string;
    status: number;
    error: any;

    constructor(
        type:
            'validate error' |
            'client error' |
            'database error' |
            'server error' |
            'logic error' |
            'other error',
        message?: string,
        stack?: string,
        error?: any
    ) {
        super(message);
        this.type = type;
        this.stack = stack;
        this.error = error;
        switch (type) {
            case 'validate error':
                this.status = 400;
                break;
            case 'client error':
                this.status = 401;
                break;
            case 'database error':
            case 'server error':
            case 'logic error':
            case 'other error':
                this.status = 500;
                break;
        }
    }

    static BadRequest(message?: string, stack?: string) {
        return new CustomError('validate error', message, stack);
    }

    static Unauthorized(message?: string, stack?: string) {
        return new CustomError('client error', message, stack);
    }

    static InternalServerError() {
        return new CustomError('server error', 'Internal Server Error');
    }

    static handleServerError(error: any) {       
        if (error instanceof CustomError) {
            return error;
        } else if (error instanceof Error) {
            return new CustomError('server error', error.message, error.stack, error);
        } else {
            return new CustomError('other error', 'Internal Server Error', undefined, error);
        }
    }
}
