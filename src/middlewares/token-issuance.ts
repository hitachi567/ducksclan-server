import { TokensPair, Middleware, asyncMiddleware } from '@hitachi567/core';
import { Transaction, LocalsWithUser, ResponseBody } from '../interfaces';
import Database from '../database';
import TokenService from '../services/token.service';

function transaction(locals: LocalsWithUser): Transaction<TokensPair> {
    return async manager => {

        const service = new TokenService(locals, manager);

        let pair = service.generatePair();

        await service.saveRefresh(pair.refresh);

        return pair;

    }
}

export function tokenIssuance(): Middleware<any, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let pair = await Database.instance.transaction<TokensPair>(
            transaction(response.locals)
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
