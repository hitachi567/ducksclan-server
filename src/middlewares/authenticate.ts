import { Middleware, ApiError, asyncMiddleware, Request } from '@hitachi567/core';
import { AuthorizedLocals } from '../interfaces';
import { UserService } from '../services';
import { app } from '..';

export function authenticate(): Middleware<any, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let token = getToken(request);
        let payload = app.jwt.verifyAccess(token);

        if (response.locals.fingerprint !== payload.fingerprint) {

            throw ApiError.Unauthorized('unreliable token');

        }

        let user = await UserService.find(payload.user_id);

        response.locals.user = user;

        next();

    });
}

function getToken(request: Request) {

    let authorization = request.headers.authorization?.split(' ');

    if (!authorization) {

        throw ApiError.BadRequest('authorization header required');

    }

    if (authorization[0] === 'Bearer') {

        return authorization[1];

    }

    throw ApiError.BadRequest('bearer token required');

}
