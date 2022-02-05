import { Middleware, asyncMiddleware } from '@hitachi567/core';
import { EmailBody, AuthorizedLocals, Transaction } from '../../interfaces';
import { UserConfirmationService } from '../../services';
import { User } from '../../entities';
import Database from '../../database/database';

function transaction(body: EmailBody, locals: AuthorizedLocals): Transaction<User> {
    return async manager => {

        const confirmation = new UserConfirmationService(locals.user, manager);

        let user = confirmation.changeEmail(body.email);

        confirmation.sendMail(locals.confirmLink.payload);
        confirmation.clearTimout();
        confirmation.setTimeout();

        return user;

    }
}

export default function changeEmail(): Middleware<EmailBody, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.instance.transaction(
            transaction(request.body, response.locals)
        );

        response.locals.user = user;

        next();

    });
}
