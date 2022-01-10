import { ApiError, TokensPair, JsonWebToken, SignOptionsPair } from '@hitachi567/core';
import { TokenPayloadInterface, LocalsWithUser } from '../interfaces';
import { EntityManager } from 'typeorm';
import FindUserService from './find-user';
import RefreshToken from '../entities/refresh-token';

export const jwt = new JsonWebToken<TokenPayloadInterface>(JsonWebToken.generateJwtSecrets());

export default class TokenIssuanceService extends FindUserService {

    constructor(protected locals: LocalsWithUser, manager?: EntityManager) {

        super(manager);

    }

    static async tokenIssuance(
        locals: LocalsWithUser,
        manager?: EntityManager
    ): Promise<TokensPair> {

        TokenIssuanceService.checkLocals(locals);

        const service = new TokenIssuanceService(locals, manager);

        let pair = service.generatePair();

        await service.saveRefresh(pair.refresh);

        return pair;

    }

    static checkLocals(locals: LocalsWithUser) {

        let text = ' not found during token generation';

        if (!locals.user) {
            throw ApiError.InternalServerError('user' + text);
        }

        if (!locals.fingerprint) {
            throw ApiError.InternalServerError('fingerprint' + text);
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

        return jwt.generateTokensPair(payload, signOptions);

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
