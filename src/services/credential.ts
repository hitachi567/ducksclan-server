import FindUserService from './find-user';
import User from '../entities/user';
import { ApiError, Hashing } from '@hitachi567/core';
import {
    Transaction,
    UsernameBody,
    PasswordBody,
    AuthorizedLocals,
    ChangePasswordBody
} from '../interfaces';

export default class CredentialService extends FindUserService {

    static registerUsername(body: UsernameBody, locals: AuthorizedLocals): Transaction<User> {
        return async manager => {

            const service = new CredentialService(manager);

            let user = await service.findUser(locals.user_id);

            return service.setUsername(user, body.username);

        }
    }

    static changeUsername(body: UsernameBody, locals: AuthorizedLocals): Transaction<User> {
        return async manager => {

            const service = new CredentialService(manager);

            let user = await service.findUser(locals.user_id);

            return service.changeUsername(user, body.username);

        }
    }

    static registerPassword(body: PasswordBody, locals: AuthorizedLocals): Transaction<User> {
        return async manager => {

            const service = new CredentialService(manager);

            let user = await service.findUser(locals.user_id);

            return service.setPassword(user, body.password);

        }
    }

    static changePassword(body: ChangePasswordBody, locals: AuthorizedLocals): Transaction<User> {
        return async manager => {

            const service = new CredentialService(manager);

            let user = await service.findUser(locals.user_id);

            return service.changePassword(user, body.oldPassword, body.password);

        }
    }

    setUsername(user: User, username: string): Promise<User> {

        user.username = username;

        return this.userRepository.save(user);

    }

    changeUsername(user: User, username: string): Promise<User> {

        if (user.username === username) {

            throw ApiError.BadRequest('specified same username');

        }

        return this.setUsername(user, username);

    }

    async setPassword(user: User, password: string): Promise<User> {

        if (user.password) {

            throw ApiError.BadRequest('password already set');

        }

        return this._setPassword(user, password);

    }

    async changePassword(user: User, oldPassword: string, password: string): Promise<User> {

        if (!user.password) {

            throw ApiError.BadRequest('it looks like you did not set password');

        }

        if (oldPassword === password) {

            throw ApiError.BadRequest('specified same password');

        }

        await this._comparison(oldPassword, user.password);

        return this._setPassword(user, password);

    }

    protected async _setPassword(user: User, password: string): Promise<User> {

        user.password = await Hashing.hashing(password);

        return this.userRepository.save(user);

    }

    protected async _comparison(password: string, hashedPassword: string) {

        let isMatched = await Hashing.comparison(password, hashedPassword);

        if (!isMatched) {

            throw ApiError.Forbidden('wrong password');

        }

    }

}
