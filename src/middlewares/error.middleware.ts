import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';

function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    let error = err instanceof ApiError ? err : ApiError.InternalServerError();

    res.status(error.status).json({
        type: error.type,
        status: error.status,
        messages: error.messages
    });

    next();
}

export default errorMiddleware;
