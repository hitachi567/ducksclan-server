import jwt from 'jsonwebtoken';
import { config } from '..';
import TokenDatabase from '../database/token.database';
import { ITokenSave } from '../interfaces/token.interfaces';

export default class TokenService {
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
        return jwt.verify(token, this.accessSecret) as TokenPayload;
    }

    validateRefreshToken(token: string) {
        return jwt.verify(token, this.refreshSecret) as TokenPayload;
    }

    async saveToken(data: ITokenSave) {
        const db = await TokenDatabase.getInstance();
        await db.destroyMany().notRelevant(data.user_id);
        await db.destroyOne().byFingerprint(data.fingerprint);
        await db.saveToken(data);
        db.close();
    }

}

export class TokenPayload {
    user_id: string;
    fingerprint: string;
    ip?: string;
}
