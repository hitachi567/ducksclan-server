import { Middleware, asyncMiddleware } from '@hitachi567/core';
import { LocalsWithUser, Transaction } from '../interfaces';
import { UserFindingService, UserConfirmationService } from '../services';
import { User } from '../entities';
import Database from '../database/database';

function transaction(link: string): Transaction<User> {
    return async manager => {

        const finding = new UserFindingService(manager);

        let user = await finding.findOne.byConfirmLink(link);

        const confirmation = new UserConfirmationService(user, manager);

        confirmation.confirm();
        confirmation.clearTimout();

        return user;

    }
}

export default function confirmEmail(): Middleware<{}, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.instance.transaction(
            transaction(request.params.link)
        );

        response.locals.user = user;

        next();

    });
}
