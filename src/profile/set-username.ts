import { asyncMiddleware, Middleware } from '@hitachi567/core';
import { LocalsWithUser, EmailBody } from '../interfaces';
import { Transaction } from '../database';
import RegistrationService from '../services/registration';
import Database from '../database';
import User from '../entities/user';
import { UsernameBody } from '../interfaces/body';

function transaction(body: UsernameBody): Transaction<User> {
    return async manager => {

        const service = new RegistrationService(manager);
        await service.checkUsernameUniqueness(body.username);

        let user = await service.findUser(body.username);

        return service.setUsername(user, body.username);

    }
}

export default function setUsername(): Middleware<UsernameBody, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            transaction(request.body)
        );

        response.locals.user = user;

        next();

    });
}
