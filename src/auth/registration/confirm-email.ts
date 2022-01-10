import { asyncMiddleware, Middleware } from '@hitachi567/core';
import { Transaction } from '../../database';
import ConfirmationService from '../../services/confirmation';
import Database from '../../database';
import User from '../../entities/user';

function transaction(link: string): Transaction<User> {
    return async manager => {

        const service = new ConfirmationService(manager);

        let user = await service.findUserByConfirmLink(link);

        await service.confirmEmail(user);
        await service.clearTimout(user);

        return user;

    }
}

export default function confirmEmail(): Middleware {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            transaction(request.params.link)
        );

        response.locals.user = user;

        next();

    });
}
