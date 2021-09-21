import ActivateCode from '../../database/entities/ActivateCode';
import DestructionLink from '../../database/entities/DestructionLink';
import User from '../../database/entities/User';
import ApiError from '../../lib/ApiError';
import BcryptService from '../../services/bcrypt.service';
import MailService from '../../services/mail.service';
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

        const code = ActivateCode.generateCode();
        await new ActivateCode({ user_id, code }).save();

        const link = 'registration.api.ducksclan.ru/destroy/' + DestructionLink.generateLinkPayload();
        await new DestructionLink({ user_id, link }).save();

        setTimeout(() => {
            this.reject(user_id,)
        }, 2 * 24 * 60 * 60 * 1000)

        await new MailService().sendConfirmMessage(email, username, code, link)

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }

    confirm(code: string) {
        return ApiError.BadRequest();
    }

    protected reject(user_id: string,) {
        ActivateCode.destroy({ where: { user_id } });
        DestructionLink.destroy({ where: { user_id } });
        User.destroy({ where: { id: user_id } });
        
    }

    protected async checkUniqueness(username: string, email: string) {
        const result = await User.findByUsernameOrEmail(username, email)
        if (result.length > 0) {
            throw ApiError.BadRequest('username or email occupied');
        }
    }
}