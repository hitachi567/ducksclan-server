import { ApiError, TokensPair, SignOptionsPair } from '@hitachi567/core';
import { TokenPayloadInterface, LocalsWithUser, Transaction } from '../interfaces';
import { EntityManager } from 'typeorm';
import { app } from '..';
import FindUserService from './find-user';
import RefreshToken from '../entities/refresh-token';

export default class TokenIssuanceService extends FindUserService {

    static tokenIssuance(locals: LocalsWithUser): Transaction<TokensPair> {
        return async manager => {

            const service = new TokenIssuanceService(locals, manager);
            service.checkLocals();

            let pair = service.generatePair();

            await service.saveRefresh(pair.refresh);

            return pair;

        }
    }

    constructor(protected locals: LocalsWithUser, manager?: EntityManager) {

        super(manager);

    }

    checkLocals() {

        let text = ' not found during token generation';

        if (!this.locals.user) {

            throw ApiError.InternalServerError('"user"' + text);

        }

        if (!this.locals.fingerprint) {

            throw ApiError.InternalServerError('"fingerprint"' + text);

        }

    }

    generatePair(): TokensPair {

        let payload: TokenPayloadInterface = {
            user_id: this.locals.user.id,
            fingerprint: this.locals.fingerprint,
            ip: this.locals.ip
        }

        let signOptions: SignOptionsPair = {
            access: {
                expiresIn: '30m'
            },
            refresh: {
                expiresIn: '30d'
            }
        }

        return app.jwt.generateTokensPair(payload, signOptions);

    }

    async saveRefresh(token: string): Promise<RefreshToken> {

        let instance = RefreshToken.init({ token, ...this.locals });

        const db = this.refreshTokenRepository;

        await db.removeNotRelevant(instance.user.id);
        await db.removeByFingerprint(instance.fingerprint);
        await db.save(instance);

        return instance;

    }

}
