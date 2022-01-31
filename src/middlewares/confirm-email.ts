import { asyncMiddleware, Middleware } from '@hitachi567/core';
import { AuthorizedLocals } from '../interfaces';
import RegistrationService from '../services/registration';
import Database from '../database';
import User from '../entities/user';

export function confirmEmail(): Middleware<{}, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(manager =>
            new RegistrationService(manager).confirmEmail(request.params.link)
        );

        response.locals.user = user;

        next();

    });
}
