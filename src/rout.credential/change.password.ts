import { Middleware, asyncMiddleware } from '@hitachi567/core';
import { ChangePasswordBody, AuthorizedLocals, Transaction } from '../interfaces';
import { UserCredentialService } from '../services';
import { User } from '../entities';
import Database from '../database/database';

function transaction(body: ChangePasswordBody, locals: AuthorizedLocals): Transaction<User> {
    return async manager => {

        const service = new UserCredentialService(locals.user, manager);

        return service.changePassword(body);

    }
}

export default function changePassword(): Middleware<ChangePasswordBody, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.instance.transaction(
            transaction(request.body, response.locals)
        );

        response.locals.user = user;

        next();

    });
}
