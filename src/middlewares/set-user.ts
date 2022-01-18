import { Middleware, asyncMiddleware } from '@hitachi567/core';
import { TransactionWrapper, LocalsWithUser } from '../interfaces';
import Database from '../database';
import User from '../entities/user';

export function setUser<B = any, L = LocalsWithUser>(
    transaction: TransactionWrapper<B, L, User>
): Middleware<B, L & LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            transaction(request.body, response.locals)
        );

        response.locals.user = user;

        next()

    });
}