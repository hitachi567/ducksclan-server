import ApiError from '../utils/ApiError';
import BcryptService from './bcrypt.service';
import TokenService from './token.service';
import UserService from './user.service';

export default class RegistrationService {
    protected userService = new UserService();
    protected bcryptService = new BcryptService();
    protected tokenService = new TokenService();

    async checkUsername(username: string) {
        const user = await this.userService.getUser.byUsername(username);
        if (user) {
            return ApiError.BadRequest('username is taken');
        }
    }

    async checkEmail(email: string) {
        const user = await this.userService.getUser.byEmail(email);
        if (user) {
            return ApiError.BadRequest('email is taken');
        }
    }

    async registration(
        username: string,
        email: string,
        password: string,
        fingerprint: string,
        ip?: string
    ) {
        const error = await this.validateNewUser(username, email);
        if (error) {
            return error;
        }

        const user_id = this.userService.generateUserId();
        const hashedPassword = await this.bcryptService.hashingPassword(password);
        await this.userService.createUser({
            user_id,
            username,
            email,
            hashedPassword
        });

        const tokens = this.tokenService.generateTokens({ user_id, fingerprint });
        await this.tokenService.saveToken({
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
        const foundedUser = await this.userService.getUser.byUsernameOrEmail(username, email);
        if (foundedUser) {
            return ApiError.BadRequest('username or email is taken');
        }
    }
}