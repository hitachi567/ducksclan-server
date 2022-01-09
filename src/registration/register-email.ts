import { asyncMiddleware, Middleware } from '@hitachi567/core';
import { LocalsWithUser, EmailBody } from '../interfaces';
import { Transaction } from '../database';
import RegistrationService from '../services/registration';
import Database from '../database';
import User from '../entities/user';

function transaction(body: EmailBody): Transaction<User> {
    return async manager => {

        const service = new RegistrationService(manager);
        await service.checkEmailUniqueness(body.email);

        let user = await service.createUser(body.email);

        await service.sendMail(user);
        await service.setTimeout(user);

        return user;

    }
}

export default function registerEmail(): Middleware<EmailBody, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            transaction(request.body)
        );

        response.locals.user = user;

        next();

    });
}
