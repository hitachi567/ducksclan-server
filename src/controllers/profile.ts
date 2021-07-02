import { NextFunction, Request, Response } from 'express';
import UserService from '../service/UserService';
import CustomError from '../utils/CustomError';

class ProfileController {

    async info(request: Request, response: Response, next: NextFunction) {
        try {
            const user_id: string = response.locals.user_id;
            const result = await new UserService().info(user_id);
            response.json(result);
            next();
        } catch (error) {
            next(CustomError.handleServerError(error));
        }
    }

    async posts(request: Request, response: Response, next: NextFunction) {
        try {
            const user_id: string = response.locals.user_id;
            const result = await new UserService().posts(user_id);
            response.json(result);
            next();
        } catch (error) {
            next(CustomError.handleServerError(error));
        }
    }

    async addPost(request: Request, response: Response, next: NextFunction) {
        try {
            const { text } = request.body;
            const user_id: string = response.locals.user_id;
            await new UserService().addPost(user_id, text);
            response.status(200);
            next();
        } catch (error) {
            next(CustomError.handleServerError(error));
        }
    }
}

export default ProfileController