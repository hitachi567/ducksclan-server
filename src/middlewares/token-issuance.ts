import { TokensPair, Middleware, asyncMiddleware } from '@hitachi567/core';
import { LocalsWithUser, ResponseBody } from '../interfaces';
import Database from '../database';
import TokenIssuanceService from '../services/token.service';

export function tokenIssuance(): Middleware<any, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let pair = await Database.instance.transaction<TokensPair>(
            TokenIssuanceService.tokenIssuance(response.locals)
        );

        let body: ResponseBody = {
            status: 200,
            message: 'success',
            payload: {
                token: pair.access
            }
        }

        response.status(body.status).json(body);

    });
}
