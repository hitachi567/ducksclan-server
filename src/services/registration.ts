import { EmailBody, AuthorizedLocals } from '../interfaces';
import { ApiError } from '@hitachi567/core';
import ConfirmationService from './confirmation';
import User from '../entities/user';

export default class RegistrationService extends ConfirmationService {

    async registerEmail(body: EmailBody) {

        await this._checkEmailUniqueness(body.email);

        let user = await this._createUser(body.email);

        await this._sendMail(user);
        await this._setTimeout(user);

        return user;

    }

    async changeEmail(body: EmailBody, locals: AuthorizedLocals) {

        await this._checkEmailUniqueness(body.email);

        let user = await this._findUser(locals.user_id);

        await this._changeEmail(user, body.email);
        await this._sendMail(user);
        await this._clearTimout(user);
        await this._setTimeout(user);

        return user;

    }

    async confirmEmail(link: string) {

        let user = await this._findUserByConfirmLink(link);

        await this._confirmEmail(user);
        await this._clearTimout(user);

        return user;

    }

    protected async _checkEmailUniqueness(email: string): Promise<void> {

        let user = await this.userRepository.findOneByEmail(email);

        if (user) {
            throw ApiError.BadRequest('email occupied');
        }

    }

    protected async _checkUsernameUniqueness(username: string): Promise<void> {

        let user = await this.userRepository.findOneByUsername(username);

        if (user) {
            throw ApiError.BadRequest('username occupied');
        }

    }

    protected async _createUser(email: string): Promise<User> {

        let user = User.init(email);

        return this.userRepository.save(user);

    }

    protected _changeEmail(user: User, newEmail: string): Promise<User> {

        if (user.isConfirmed) {

            throw ApiError.Forbidden('old email already confirmed');

        }

        if (user.email === newEmail) {

            throw ApiError.Forbidden('specified same email');

        }

        user.email = newEmail;

        return this.userRepository.save(user);

    }

}
