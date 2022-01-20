import { JsonWebToken, ApiError } from '@hitachi567/core';
import { TokenPayloadInterface } from '../interfaces';

export default class TokenService extends JsonWebToken<TokenPayloadInterface> {

    verifyAccess(token: string) {
        return this.checkPayload(super.verifyAccess(token));
    }

    verifyRefresh(token: string) {
        return this.checkPayload(super.verifyRefresh(token));
    }

    protected checkPayload(payload: TokenPayloadInterface) {

        if (!payload) {

            throw ApiError.Unauthorized('invalid token');

        }

        let check1 = payload.user_id && typeof payload.user_id === 'string';
        let check2 = payload.fingerprint && typeof payload.fingerprint === 'string';
        let check3 = payload.ip ? typeof payload.fingerprint === 'string' : true;

        if (!check1 || !check2 || !check3) {

            throw ApiError.Unauthorized('invalid token payload');

        }

        return payload;

    }

}
