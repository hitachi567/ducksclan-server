import { Middleware, ApiError, asyncMiddleware } from '@hitachi567/core';
import { AuthorizedLocals } from '../interfaces';
import { app } from '..';

export function authenticate(): Middleware<any, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let authorization = request.headers.authorization?.split(' ');

        if (!authorization) {
            throw ApiError.BadRequest('authorization header required');
        }

        let token = authorization[1];

        let { fingerprint, user_id } = app.jwt.verifyAccess(token);

        if (response.locals.fingerprint !== fingerprint) {
            throw ApiError.Unauthorized();
        }

        response.locals.user_id = user_id;

        next();

    })
}
