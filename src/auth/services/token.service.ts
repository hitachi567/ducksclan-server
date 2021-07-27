import jwt from 'jsonwebtoken';
import { config } from '../..';

export default class TokenService {
    private accessSecret = config.JWT_access_secret;
    private refreshSecret = config.JWT_refresh_secret;

    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, this.accessSecret, {
            expiresIn: '30m'
        });
        const refreshToken = jwt.sign(payload, this.refreshSecret, {
            expiresIn: '30d'
        });
        return {
            accessToken, refreshToken
        }
    }

    getUserID(token: string): string | undefined {
        const result = jwt.decode(token) as { user_id: string };
        return result.user_id;
    }

    validateAccessToken(token: string) {
        try {
            const result = jwt.verify(token, this.accessSecret) as { user_id: string };
            return result.user_id;
        } catch (error) {
            return undefined;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const result = jwt.verify(token, this.refreshSecret) as { user_id: string };
            return result.user_id;
        } catch (error) {
            return undefined;
        }
    }
}
