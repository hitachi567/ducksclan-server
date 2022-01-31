import { FindUserOptions, FindUserMethods } from '../interfaces';
import { ApiError } from '@hitachi567/core';
import { EntityManager } from 'typeorm';
import Repositories from '../repositories';
import User from '../entities/user';

export class UserService extends Repositories {

    constructor(public user: User, manager: EntityManager) {

        super(manager);

    }

    async saveUser() {
        this.user = await this.userRepository.save(this.user);
        return this.user;
    }

    static find(): FindUserMethods;
    static find(user_id: string): Promise<User>;
    static find(user_id?: string): Promise<User> | FindUserMethods {

        if (user_id) {

            return new FindService().find(user_id);

        }

        return {
            byConfirmLink(link: string) {

                return new FindService().findByConfirmLink(link);

            }
        }

    }

    static checkUniqueness() {
        return {
            ofUsername(username: string) {

                return new FindService().checkUsernameUniqueness(username);

            },
            ofEmail(email: string) {

                return new FindService().checkEmailUniqueness(email);

            }
        }
    }

    checkUniqueness() {
        let manager = this.manager;
        return {
            ofUsername(username: string) {

                return new FindService(manager).checkUsernameUniqueness(username);

            },
            ofEmail(email: string) {

                return new FindService(manager).checkEmailUniqueness(email);

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

}
