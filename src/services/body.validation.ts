import { PasswordBody, UsernameBody, EmailBody } from '../interfaces';
import { Middleware } from '@hitachi567/core';
import { body } from 'express-validator';

export default class BodyValidationService {

    static EmailBody(): Middleware<EmailBody> {

        let middleware = body('email');
        middleware.notEmpty().withMessage('email were expected, but not received');
        middleware.isString().withMessage('email must be string');
        middleware.isEmail().withMessage('email must be valid');
        middleware.trim();

        return middleware;

    }

    static UsernameBody(): Middleware<UsernameBody> {

        let middleware = body('username');

        middleware.notEmpty().withMessage('username were expected, but not received');
        middleware.isString().withMessage('username must be string');

        middleware.trim().toLowerCase();

        middleware.isLength({ min: 3, max: 30 })
            .withMessage('username must be greater than or equal to 3 and must be less than or equal to 30');
        middleware.isAlphanumeric('en-US', { ignore: /_/g })
            .withMessage('username must contain only alphanumeric latin characters including underscore');

        return middleware;

    }

    static PasswordBody(): Middleware<PasswordBody> {

        let password = body('password');

        password.notEmpty().withMessage('password were expected, but not received');
        password.isString().withMessage('password must be string');

        password.trim();

        password.isLength({ min: 3, max: 50 })
            .withMessage('password must be greater than or equal to 3 and must be less than or equal to 50');

        return password;

    }

}
