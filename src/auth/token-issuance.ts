import { TokensPair, Middleware, asyncMiddleware, day } from '@hitachi567/core';
import { LocalsWithUser, ResponseBody } from '../interfaces';
import { Transaction } from '../database';
import Database from '../database/index';
import TokenIssuanceService from '../services/token-issuance';

function transaction(locals: LocalsWithUser): Transaction<TokensPair> {
    return async manager => {

        TokenIssuanceService.checkLocals(locals);

        const service = new TokenIssuanceService(locals, manager);

        let pair = service.generatePair();

        await service.saveRefresh(pair.refresh);

        return pair;

    }
}

export default function tokenIssuance(): Middleware<any, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let pair = await Database.transaction<TokensPair>(
            transaction(response.locals)
        );

        let body: ResponseBody = {
            status: 200,
            message: 'success',
            payload: {
                token: pair.access
            }
        }

        response.cookie('token', pair.refresh, {
            httpOnly: true,
            signed: true,
            maxAge: 30 * day('ms'),
        });
        response.status(body.status).json(body);

    });
}
