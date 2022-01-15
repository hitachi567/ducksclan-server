import { EmailBody, AuthorizedLocals } from '../interfaces';
import { ApiError } from '@hitachi567/core';
import ConfirmationService from './confirmation';
import User from '../entities/user';
import { Transaction } from '../interfaces/database';

export default class RegistrationService extends ConfirmationService {

    static registerEmail(body: EmailBody): Transaction<User> {
        return async manager => {

            const service = new RegistrationService(manager);
            await service.checkEmailUniqueness(body.email);

            let user = await service.createUser(body.email);

            await service.sendMail(user);
            await service.setTimeout(user);

            return user;

        }
    }

    static changeEmail(body: EmailBody, locals: AuthorizedLocals): Transaction<User> {
        return async manager => {

            const service = new RegistrationService(manager);
            await service.checkEmailUniqueness(body.email);

            let user = await service.findUser(locals.user_id);

            await service.changeEmail(user, body.email);
            await service.sendMail(user);
            await service.clearTimout(user);
            await service.setTimeout(user);

            return user;

        }
    }

    static confirmEmail(link: string): Transaction<User> {
        return async manager => {

            const service = new ConfirmationService(manager);

            let user = await service.findUserByConfirmLink(link);

            await service.confirmEmail(user);
            await service.clearTimout(user);

            return user;

        }
    }

    async checkEmailUniqueness(email: string): Promise<void> {

        let user = await this.userRepository.findOneByEmail(email);

        if (user) {
            throw ApiError.BadRequest('email occupied');
        }

    }

    async checkUsernameUniqueness(username: string): Promise<void> {

        let user = await this.userRepository.findOneByUsername(username);

        if (user) {
            throw ApiError.BadRequest('username occupied');
        }

    }

    async createUser(email: string): Promise<User> {

        let user = User.init(email);

        return this.userRepository.save(user);

    }

    changeEmail(user: User, newEmail: string): Promise<User> {

        if (user.isConfirmed) {

            throw ApiError.Forbidden('old email already confirmed');

        }

        if (user.email === newEmail) {

            throw ApiError.Forbidden('specified same email');

        }

        user.email = newEmail;

        return this.userRepository.save(user);

    }

    setUsername(user: User, username: string): Promise<User> {

        user.username = username;

        return this.userRepository.save(user);

    }

    setPassword(user: User, password: string) {

        if (user.password !== undefined) {

            throw ApiError.Forbidden('password already set');

        }

        user.password = password;

        return this.userRepository.save(user);

    }

}
