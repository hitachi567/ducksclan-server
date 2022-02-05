import { Middleware, asyncMiddleware } from '@hitachi567/core';
import { EmailBody, LocalsWithUser, Transaction } from '../interfaces';
import { UserCreationService, UserConfirmationService } from '../services';
import { User } from '../entities';
import Database from '../database/database';

function transaction(body: EmailBody): Transaction<User> {
    return async manager => {

        const creation = new UserCreationService(manager);

        let result = await creation.create(body.email);

        const confirmation = new UserConfirmationService(result.user, manager);

        confirmation.sendMail(result.confirmLink.payload);
        confirmation.setTimeout();

        return result.user;

    }
}

export default function register(): Middleware<EmailBody, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.instance.transaction(
            transaction(request.body)
        );

        response.locals.user = user;

        next();

    });
}
