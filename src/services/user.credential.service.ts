import { ApiError, Hashing } from '@hitachi567/core';
import { UserService } from './user.service';
import { ChangePasswordBody } from '../interfaces';
import User from '../entities/user';

export class UserCredentialService extends UserService {

    async setUsername(username: string) {

        if (this.user.username === username) {

            throw ApiError.BadRequest('specified same username');

        }

        await this.finding.checkUniqueness.ofUsername(username);

        this.user.username = username;

        this.user = await this.manager.save(this.user);

        return this.user;

    }

    async setPassword(password: string): Promise<User> {

        if (this.user.password) {

            throw ApiError.BadRequest('password already set');

        }

        return this._setPassword(password);

    }

    async changePassword(body: ChangePasswordBody): Promise<User> {

        if (body.old === body.password) {

            throw ApiError.BadRequest('specified same password');

        }

        if (this.user.password) {

            await this.comparison(body.old, this.user.password);

        }

        return this._setPassword(body.password);

    }

    private async _setPassword(password: string): Promise<User> {

        this.user.password = await Hashing.hashing(password);

        this.user = await this.manager.save(this.user);

        return this.user;

    }

    private async comparison(password: string, hashedPassword: string) {

        let isMatched = await Hashing.comparison(password, hashedPassword);

        if (!isMatched) {

            throw ApiError.Forbidden('wrong password');

        }

    }

}
