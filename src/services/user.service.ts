import { ApiError } from '@hitachi567/core';
import { EntityManager } from 'typeorm';
import { UserCreationService } from './user.creation.service';
import { UserFindingService } from './user.finding.service';
import { User, ConfirmLink } from '../entities';
import Repositories from '../repositories';

export class UserService extends Repositories {

    creation: UserCreationService;
    finding: UserFindingService;
    user: User;

    constructor(user: User, manager: EntityManager) {
        super(manager);

        this.user = user;
        this.creation = new UserCreationService(manager);
        this.finding = new UserFindingService(manager);
    }

    async changeEmail(email: string) {

        if (this.user.email === email) {

            throw ApiError.Forbidden('specified same email');

        }

        if (this.user.confirmed_at) {

            throw ApiError.Forbidden('email already confirmed');

        }

        await this.finding.checkUniqueness.ofEmail(email);

        this.user.email = email;

        if (this.user.confirmLink) {

            this.user.confirmLink.regenerate();

        } else {

            this.user.confirmLink = new ConfirmLink(this.user);

        }

        this.user = await this.manager.save(this.user);

        return this.user;

    }

    async logoutEverywhere(user_id: string) {

        await this.reps.tokenRefresh.removeByUserID(user_id)

    }

}
