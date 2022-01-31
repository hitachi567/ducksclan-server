import { TokensPair, Middleware, asyncMiddleware } from '@hitachi567/core';
import { AuthorizedLocals, ResponseBody } from '../interfaces';
import Database from '../database/index';
import TokenIssuanceService from '../services/token-issuance';

export function tokenIssuance(): Middleware<any, AuthorizedLocals> {
    return asyncMiddleware(async (request, response, next) => {

        let pair = await Database.transaction<TokensPair>(
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
