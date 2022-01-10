import { Middleware, ApiError, asyncMiddleware } from '@hitachi567/core';
import { AuthorizedLocals } from '../interfaces';
import { jwt } from '../services/token-issuance';

export default function authenticate(): Middleware<any, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let authorization = request.headers.authorization?.split(' ');

        if (!authorization) {
            throw ApiError.BadRequest('authorization header required');
        }

        let token = authorization[1];

        let { fingerprint, user_id } = jwt.verifyAccess(token);

        if (response.locals.fingerprint !== fingerprint) {
            throw ApiError.Unauthorized();
        }

        response.locals.user_id = user_id;

        next();

    })
}
