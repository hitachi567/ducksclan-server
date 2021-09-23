import jwt from 'jsonwebtoken';
import { config } from '..';
import Token from '../database/entities/Token';
import { EntitieToken } from '../interfaces/entities';

export default class TokenService {

    static generate(payload: TokenPayload): Tokens {
        const created_at = new Date();
        const access = jwt.sign(payload, config.jwtSecrets.access, { expiresIn: '30m' });
        const refresh = jwt.sign(payload, config.jwtSecrets.refresh, { expiresIn: '30d' });
        return {
            created_at,
            access,
            refresh
        }
    }

    static getPayload(token: string) {
        return jwt.decode(token);
    }

    static validateAccess(token: string) {
        return jwt.verify(token, config.jwtSecrets.access) as TokenPayload;
    }

    static validateRefresh(token: string) {
        return jwt.verify(token, config.jwtSecrets.refresh) as TokenPayload;
    }

    static async save(data: EntitieToken) {
        await Token.destroyAllNotRelevant(data.user_id);
        let token = await Token.findByFingerprint(data.fingerprint);

        if (token) {
            token.token = data.token;
            token.user_id = data.user_id;
            token.created_at = data.created_at || new Date();
            if (data.ip) token.ip = data.ip;
        } else {
            token = new Token(data);
        }

        return await token.save();
    }

    static async generateAndSave(payload: TokenPayload) {
        let tokens = this.generate(payload);

        await this.save({
            ...payload,
            token: tokens.refresh,
            created_at: tokens.created_at
        });

        delete tokens.created_at;
        return tokens;
    }

}

export class TokenPayload {
    user_id: string;
    fingerprint: string;
    ip?: string;
}

export class Tokens {
    access: string;
    refresh: string;
    created_at?: Date;
}
