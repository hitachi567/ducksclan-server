import FindUserService from './find-user';
import User from '../entities/user';
import { ApiError, Hashing } from '@hitachi567/core';
import {
    UsernameBody,
    PasswordBody,
    AuthorizedLocals,
    ChangePasswordBody
} from '../interfaces';

export default class CredentialService extends FindUserService {

    async registerUsername(body: UsernameBody, locals: AuthorizedLocals): Promise<User> {

        let user = await this._findUser(locals.user_id);

        user.username = body.username;

        return this.userRepository.save(user);

    }

    async changeUsername(body: UsernameBody, locals: AuthorizedLocals): Promise<User> {

        let user = await this._findUser(locals.user_id);

        if (user.username === body.username) {

            throw ApiError.BadRequest('specified same username');

        }

        user.username = body.username;

        return this.userRepository.save(user);

    }


    // TODO: check login to others accounts
    async registerPassword(body: PasswordBody, locals: AuthorizedLocals): Promise<User> {

        let user = await this._findUser(locals.user_id);

        if (user.password) {

            throw ApiError.BadRequest('password already set');

        }

        user.password = await Hashing.hashing(body.password);

        return this.userRepository.save(user);

    }

    async changePassword(body: ChangePasswordBody, locals: AuthorizedLocals): Promise<User> {

        let user = await this._findUser(locals.user_id);

        if (body.oldPassword === body.password) {

            throw ApiError.BadRequest('specified same password');

        }

        if (user.password) {

            await this._comparison(body.oldPassword, user.password);

        }

        return this._setPassword(user, body.password);

    }

    // TODO: removing refresh tokens for other devices from db
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
