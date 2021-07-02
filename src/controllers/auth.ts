import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AuthService from '../service/AuthService';
import CustomError from '../utils/CustomError';

class AuthController {

    signUpValidation(request: Request, response: Response, next: NextFunction) {
        const { error } = Joi.object({
            email: Joi.string().email().required(),
            username: Joi.string().min(3).max(50).required(),
            name: Joi.string().min(3).max(50).required(),
            password: Joi.string().min(5).max(50).required()
        }).unknown(true).validate(request.body);

        if (error) {
            next(CustomError.BadRequest(error.message.replace(/"/g, '')));
        } else {
            next();
        }
    }

    async signUp(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, username, name, password } = request.body;
            const userData = await new AuthService().signUp({
                email, username, name, password
            });
            response.cookie('refreshToken', userData?.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true
            });
            response.json({
                user_id: userData.user_id,
                token: userData.tokens.accessToken
            });
            next();
        } catch (error) {
            next(CustomError.handleServerError(error));
        }
    }

    signInValidation(request: Request, response: Response, next: NextFunction) {
        const { error } = Joi.object({
            unique: Joi.string().min(3).max(50).required(),
            password: Joi.string().min(5).max(50).required()
        }).unknown(true).validate(request.body);

        if (error) {
            next(CustomError.BadRequest(error.message.replace(/"/g, '').replace('unique', 'username')));
        } else {
            next();
        }
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        try {
            const { unique, password } = request.body;
            const userData = await new AuthService().signIn(unique, password);
            response.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false
            }).status(200).json({
                user_id: userData.user_id,
                token: userData.tokens.accessToken
            });
            next();
        } catch (error) {
            next(CustomError.handleServerError(error));
        }
    }

    checkCookie(request: Request, response: Response, next: NextFunction) {
        const { refreshToken } = request.cookies;
        const { error } = Joi.object({
            refreshToken: Joi.string().required()
        }).unknown(true).validate(request.cookies);
        console.log(refreshToken)
        if (error) {
            response.clearCookie('refreshToken');
            next(CustomError.Unauthorized(error.message.replace(/"/g, '')));
        } else {
            next();
        }
    }

    async signOut(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken } = request.cookies;
            await new AuthService().signOut(refreshToken);
            response.status(200);
        } catch (error) {
            next(CustomError.handleServerError(error));
        } finally {
            response.clearCookie('refreshToken');
        }
    }

    activateValidation(request: Request, response: Response, next: NextFunction) {
        const { error } = Joi.object({
            refreshToken: Joi.string().required()
        }).unknown(true).validate(request.cookies);

        if (error) {
            next(CustomError.BadRequest(error.message.replace(/"/, '')));
        } else {
            next();
        }
    }

    async activate(request: Request, response: Response, next: NextFunction) {
        try {

        } catch (error) {

        }
    }

    async refresh(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken } = request.cookies;
            const userData = await new AuthService().refresh(refreshToken);
            response.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true
            });
            response.json({
                user_id: userData.user_id,
                token: userData.tokens.accessToken
            });
            next();
        } catch (error) {
            response.clearCookie('refreshToken');
            next(CustomError.handleServerError(error));
        }
    }
}

export default AuthController;
