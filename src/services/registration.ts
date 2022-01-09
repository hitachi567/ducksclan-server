import { Middleware, ApiError } from '@hitachi567/core';
import { body } from 'express-validator';
import ConfirmationService from './confirmation';
import User from '../entities/user';

export default class RegistrationService extends ConfirmationService {

    static checkBodyEmailValid(): Middleware {

        let middleware = body('email');
        middleware.notEmpty().withMessage('email were expected, but not received');
        middleware.isString().withMessage('email must be string');
        middleware.isEmail().withMessage('email must be valid');
        middleware.trim();

        return middleware;

    }

    async checkEmailUniqueness(email: string): Promise<void> {

        let user = await this.userRepository.findOneByEmail(email);

        if (user) {
            throw ApiError.BadRequest('email occupied');
        }

    }

    async checkUsernameUniqueness(username: string): Promise<void> {

        let user = await this.userRepository.findOneByUsername(username);

        if (user) {
            throw ApiError.BadRequest('username occupied');
        }

    }

    async createUser(email: string): Promise<User> {

        let user = User.init(email);

        return this.userRepository.save(user);

    }

    changeEmail(user: User, newEmail: string): Promise<User> {

        if (user.isConfirmed) {

            throw ApiError.Forbidden('old email already confirmed');

        }

        if (user.email === newEmail) {

            throw ApiError.Forbidden('specified same email');

        }

        user.email = newEmail;

        return this.userRepository.save(user);

    }

    setUsername(user: User, username: string): Promise<User> {

        user.username = username;

        return this.userRepository.save(user);

    }

    setPassword(user: User, password: string) {

        if (user.password !== undefined) {

            throw ApiError.Forbidden('password already set');

        }

        user.password = password;

        return this.userRepository.save(user);

    }

}
