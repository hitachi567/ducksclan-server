import { ApiError } from '@hitachi567/core';
import Repositories from '../repositories';
import User from '../entities/user';

export default class FindUserService extends Repositories {

    protected async _findUser(user_id: string): Promise<User> {

        let user = await this.userRepository.findOneByID(user_id, {
            refreshToken: true
        });

        if (!user) {

            throw ApiError.Forbidden('invalid user_id');

        }

        return user;

    }

    protected async _findUserByConfirmLink(link: string) {

        let user = await this.userRepository.findOneByConfirmLink(link);

        if (!user) {

            throw ApiError.Forbidden('invalid link payload');

        }

        return user;
    }

}
