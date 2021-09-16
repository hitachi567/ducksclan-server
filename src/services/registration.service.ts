import UserDatabase from '../database/user.database';
import ApiError from '../utils/ApiError';
import BcryptService from './bcrypt.service';
import TokenService from './token.service';
import UserService from './user.service';

export default class RegistrationService {

    async registration(
        username: string,
        email: string,
        password: string,
        fingerprint: string,
        ip?: string
    ) {
        await this.validateNewUser(username, email);

        const userService = new UserService();
        const user_id = userService.generateUserID();
        const hashedPassword = await new BcryptService().hashingPassword(password);
        await userService.create(user_id, username, hashedPassword, email);

        const tokenService = new TokenService();
        const tokens = tokenService.generateTokens({ user_id, fingerprint });
        await tokenService.saveToken({
            user_id,
            fingerprint,
            ip,
            date: tokens.date,
            token: tokens.refreshToken
        });

        // send mail
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }

    confirm(code: string) {
        return ApiError.BadRequest();
    }

    protected async validateNewUser(username: string, email: string) {
        const client = await UserDatabase.getInstance();
        try {
            const result1 = await client.findOne().byUsername(username);
            if (result1.rowCount > 0) {
                throw ApiError.BadRequest('username is taken');
            }

            const result2 = await client.findOne().byEmail(email);
            if (result2.rowCount > 0) {
                throw ApiError.BadRequest('email is taken');
            }
        } finally {
            client.close();
        }
    }
}