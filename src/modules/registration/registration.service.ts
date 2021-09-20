import User from '../../database/entities/User';
import ApiError from '../../lib/ApiError';
import BcryptService from '../../services/bcrypt.service';
import TokenService from '../../services/token.service';

export default class RegistrationService {

    async registration(
        username: string,
        email: string,
        password: string,
        fingerprint: string,
        ip?: string
    ) {
        await this.checkUniqueness(username, email);

        const user_id = User.generateID();
        const hashedPassword = await new BcryptService().hashingPassword(password);
        await new User({
            id: user_id,
            email,
            username,
            password: hashedPassword
        }).save();

        const tokenService = new TokenService();
        const tokens = tokenService.generateTokens({ user_id, fingerprint, ip });
        await tokenService.saveToken({
            user_id,
            fingerprint,
            ip,
            created_at: tokens.created_at,
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

    protected async checkUniqueness(username: string, email: string) {
        const result = await User.findByUsernameOrEmail(username, email)
        if (result.length > 0) {
            throw ApiError.BadRequest('username or email occupied');
        }
    }
}