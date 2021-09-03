import jwt from 'jsonwebtoken';
import { config } from '..';
import Token from '../database/entities/Token';
import UserDatabase from '../database/user.database';

export default class TokenService {
    protected connection = new UserDatabase()
    private accessSecret: string = config.jwtSecrets.access;
    private refreshSecret: string = config.jwtSecrets.refresh;

    generateTokens(payload: TokenPayload) {
        const date = new Date()
        const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: '30d' });
        return {
            date,
            accessToken,
            refreshToken
        }
    }

    getPayload(token: string) {
        return jwt.decode(token);
    }

    validateAccessToken(token: string) {
        return jwt.verify(token, this.accessSecret)/*  as TokenPayload */;
    }

    validateRefreshToken(token: string) {
        return jwt.verify(token, this.refreshSecret) as TokenPayload;
    }

    async saveToken(data: {
        user_id: string,
        token: string,
        date: Date,
        fingerprint?: string,
        ip?: string
    }) {
        const token = new Token();
        token.user_id = data.user_id;
        token.date = data.date;
        if (data.fingerprint) {
            token.fingerprint = data.fingerprint;
        }
        if (data.ip) {
            token.ip = data.ip;
        }
        await this.connection.manager.save(token);
    }

}

export class TokenPayload {
    user_id: string;
    fingerprint: string;
    ip?: string;
}
