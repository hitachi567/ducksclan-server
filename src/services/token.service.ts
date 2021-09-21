import jwt from 'jsonwebtoken';
import { config } from '..';
import Token, { IToken } from '../database/entities/Token';

export default class TokenService {
    private accessSecret: string = config.jwtSecrets.access;
    private refreshSecret: string = config.jwtSecrets.refresh;

    generateTokens(payload: TokenPayload) {
        const created_at = new Date()
        const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: '30d' });
        return {
            created_at,
            accessToken,
            refreshToken
        }
    }

    getPayload(token: string) {
        return jwt.decode(token);
    }

    validateAccessToken(token: string) {
        return jwt.verify(token, this.accessSecret) as TokenPayload;
    }

    validateRefreshToken(token: string) {
        return jwt.verify(token, this.refreshSecret) as TokenPayload;
    }

    async saveToken(data: IToken) {
        Token.destroyAllNotRelevant(data.user_id);
        Token.findByPk(data.fingerprint);
        return new Token(data).save();
    }
}

export class TokenPayload {
    user_id: string;
    fingerprint: string;
    ip?: string;
}
