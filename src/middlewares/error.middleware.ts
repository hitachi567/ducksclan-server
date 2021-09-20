import { NextFunction, Request, Response } from 'express';
import ApiError from '../lib/ApiError';

function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    let error = err instanceof ApiError ? err : ApiError.InternalServerError();

    res.status(error.status).json({
        type: error.type,
        status: error.status,
        messages: error.messages
    });

    console.log(err);    

    next();
}

export default errorMiddleware;
