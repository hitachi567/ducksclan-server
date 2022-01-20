import { FindUserOptions, FindUserMethods } from '../interfaces';
import { ApiError } from '@hitachi567/core';
import { EntityManager } from 'typeorm';
import Repositories from '../repositories';
import User from '../entities/user';

export class UserService extends Repositories {

    constructor(
        public user: User,
        manager: EntityManager
    ) {

        super(manager);

    }

    static find(): FindUserMethods;
    static find(user_id: string): Promise<User>;
    static find(user_id?: string): Promise<User> | FindUserMethods {

        if (user_id) {

            return new FindService().find(user_id);

        }

        return {
            async ByConfirmLink(link: string) {

                return new FindService().findByConfirmLink(link);

            }
        }

    }

}

class FindService extends Repositories {

    protected findOptions: FindUserOptions = {
        refreshToken: true
    }

    async find(user_id: string): Promise<User> {

        let user = await this.userRepository.findOneByID(user_id, {
            refreshToken: true
        });

        if (!user) {

            throw ApiError.NotFound('invalid user_id');

        }

        return user;

    }

    async findByConfirmLink(link: string) {

        let user = await this.userRepository.findOneByConfirmLink(link);

        if (!user) {

            throw ApiError.NotFound('invalid link payload');

        }

        return user;

    }

}
