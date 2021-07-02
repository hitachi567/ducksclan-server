import { NextFunction, Response, Request } from 'express';
import CustomError from './utils/CustomError';
import Log from './utils/Log';

export default function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof CustomError) {
        console.log(error)
        response.status(error.status).json({ message: error.message });
    } else {
        Log.error('%O', error);
        response.status(500).json({ message: 'something went wrong' });
    }
}