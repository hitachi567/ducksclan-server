import { TokensPair, SignOptionsPair } from '@hitachi567/core';
import { TokenPayloadInterface, LocalsWithUser, Transaction } from '../interfaces';
import { EntityManager } from 'typeorm';
import { app } from '..';
import TokenRefresh from '../entities/token.refresh';
import Repositories from '../repositories/index';

export default class TokenService extends Repositories {

    static tokenIssuance(locals: LocalsWithUser): Transaction<TokensPair> {
        return async manager => {

            const service = new TokenService(locals, manager);

            let pair = service.generatePair();

            await service.saveRefresh(pair.refresh);

            return pair;

        }
    }

    constructor(protected locals: LocalsWithUser, manager?: EntityManager) {

        super(manager);

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

    async saveRefresh(token: string): Promise<TokenRefresh> {

        let instance = TokenRefresh.init({ token, ...this.locals });

        const rep = this.reps.tokenRefresh;

        await rep.removeNotRelevant(instance.user.id);
        await rep.removeByFingerprint(instance.fingerprint);
        await rep.save(instance);

        return instance;

    }

}
