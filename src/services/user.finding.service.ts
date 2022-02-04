import { ApiError } from '@hitachi567/core';
import { FindUserOptions } from '../interfaces';
import Repositories from '../repositories';
import User from '../entities/user';

interface FindOneMethods {
    byID(id: string): Promise<User>;
    byEmail(email: string): Promise<User>;
    byUsername(username: string): Promise<User>;
    byConfirmLink(payload: string): Promise<User>;
}

interface CheckUniquenessMethods {
    ofEmail(email: string): Promise<void>;
    ofUsername(username: string): Promise<void>;
}

export class UserFindingService extends Repositories {

    get findOne(): FindOneMethods {

        const thisRef = this;

        return {
            byID: thisRef.findOneByID,
            byEmail: thisRef.findOneByEmail,
            byUsername: thisRef.findOneByUsername,
            byConfirmLink: thisRef.findOneByConfirmLink
        }
    }

    get checkUniqueness(): CheckUniquenessMethods {

        const thisRef = this;

        return {
            ofEmail: thisRef.checkEmailUniqueness,
            ofUsername: thisRef.checkUsernameUniqueness
        }
    }

    private findOptions: FindUserOptions = {
        tokenRefresh: true,
        confirmLink: true,
        userOnline: true,
        userProfile: true
    }

    private async findOneByID(id: string) {

        let user = await this.reps.user.findOneByID(id, this.findOptions);

        if (!user) {
            throw ApiError.NotFound('user not found - invalid id');
        }

        return user;

    }

    private async findOneByEmail(email: string) {

        let user = await this.reps.user.findOneByEmail(email, this.findOptions);

        if (!user) {
            throw ApiError.NotFound('user not found - invalid email');
        }

        return user;

    }

    private async findOneByUsername(username: string) {

        let user = await this.reps.user.findOneByUsername(username, this.findOptions);

        if (!user) {
            throw ApiError.NotFound('user not found - invalid username');
        }

        return user;

    }

    private async findOneByConfirmLink(payload: string) {

        let user = await this.reps.user.findOneByConfirmLink(payload);

        if (!user) {
            throw ApiError.NotFound('user not found - invalid confirm link payload');
        }

        return user;

    }

    private async checkEmailUniqueness(email: string): Promise<void> {

        let user = await this.reps.user.findOneByEmail(email);

        if (user) {

            throw ApiError.BadRequest('email occupied');

        }

    }

    private async checkUsernameUniqueness(username: string): Promise<void> {

        let user = await this.reps.user.findOneByUsername(username);

        if (user) {

            throw ApiError.BadRequest('username occupied');

        }

    }

}
