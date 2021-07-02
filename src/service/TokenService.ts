import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

export default class TokenService {
    private accessSecret = process.env.JWT_access_secret || v4();
    private refreshSecret = process.env.JWT_refresh_secret || v4();

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

    getUserID(token: string) {
        const result = jwt.decode(token) as { user_id: string };
        const { error } = Joi.object({
            user_id: Joi.string().required()
        }).unknown(true).validate(result);

        if (!error) {
            return result.user_id
        }
    }

    validateAccessToken(token: string) {
        try {
            const result = jwt.verify(token, this.accessSecret) as { user_id: string };
            const { error } = Joi.object({
                user_id: Joi.string().required()
            }).unknown(true).validate(result);

            if (!error) {
                return result.user_id
            }
        } catch (error) {
            return undefined;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const result = jwt.verify(token, this.refreshSecret) as { user_id: string };
            const { error } = Joi.object({
                user_id: Joi.string().required()
            }).unknown(true).validate(result);

            if (!error) {
                return result.user_id
            }
        } catch (error) {
            return undefined;
        }
    }
}