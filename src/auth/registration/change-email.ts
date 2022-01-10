import { asyncMiddleware, Middleware } from '@hitachi567/core';
import { LocalsWithUser, AuthorizedLocals, EmailBody } from '../../interfaces';
import { Transaction } from '../../database';
import RegistrationService from '../../services/registration';
import Database from '../../database';
import User from '../../entities/user';

function transaction(body: EmailBody, locals: AuthorizedLocals): Transaction<User> {
    return async manager => {

        const service = new RegistrationService(manager);
        await service.checkEmailUniqueness(body.email);

        let user = await service.findUser(locals.user_id);

        await service.changeEmail(user, body.email);
        await service.sendMail(user);
        await service.clearTimout(user);
        await service.setTimeout(user);

        return user;

    }
}

export default function changeEmail(): Middleware<EmailBody, LocalsWithUser & AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            transaction(request.body, response.locals)
        );

        response.locals.user = user;

        next();

    });
}
