import { PasswordBody, UsernameBody, EmailBody, ChangePasswordBody } from '../interfaces';
import { Middleware } from '@hitachi567/core';
import { body } from 'express-validator';

export default class BodyValidationService {

    static EmailBody(): Middleware<EmailBody>[] {

        let middleware = body('email');
        middleware.notEmpty().withMessage('email were expected, but not received');
        middleware.isString().withMessage('email must be string');
        middleware.isEmail().withMessage('email must be valid');
        middleware.trim();

        return [middleware];

    }

    static UsernameBody(): Middleware<UsernameBody>[] {

        let middleware = body('username');

        middleware.notEmpty().withMessage('username were expected, but not received');
        middleware.isString().withMessage('username must be string');

        middleware.trim().toLowerCase();

        middleware.isLength({ min: 3, max: 30 })
            .withMessage('username must be greater than or equal to 3 and must be less than or equal to 30');
        middleware.isAlphanumeric('en-US', { ignore: /_/g })
            .withMessage('username must contain only alphanumeric latin characters including underscore');

        return [middleware];

    }

    static PasswordBody(): Middleware<PasswordBody>[] {

        return [
            this._PasswordBody('password')
        ];

    }

    static ChangePasswordBody(): Middleware<ChangePasswordBody>[] {

        return [
            this._PasswordBody('password'),
            this._PasswordBody('oldPassword')
        ];

    }

    protected static _PasswordBody(name: string): Middleware {

        let password = body(name);

        password.notEmpty().withMessage(name + ' were expected, but not received');
        password.isString().withMessage(name + ' must be string');

        password.trim();

        password.isLength({ min: 3, max: 50 })
            .withMessage(name + ' must be greater than or equal to 3 and must be less than or equal to 50');

        return password;

    }

}
