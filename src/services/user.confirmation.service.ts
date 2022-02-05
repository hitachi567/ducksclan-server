import { day, Timeout } from '@hitachi567/core';
import { UserService } from './user.service';
import UserRepository from '../repositories/user.repository';
import Database from '../database/database';

export const rejectRegistrationTimout = new Timeout();

export class UserConfirmationService extends UserService {

    // TODO: implement mail service 
    async sendMail(link: string) {

        // await MailService.sendConfirmMessage(user.email, user.username, link);

    }

    async confirm() {

        await this.reps.confirmLink.deleteByUserID(this.user.id);

        this.user.confirmed_at = new Date();
        this.user = await this.reps.user.save(this.user);

    }

    setTimeout() {

        rejectRegistrationTimout.setTimeout(
            this.user.id,
            this.removeUser,
            7 * day('ms')
        );

    }

    clearTimout() {

        rejectRegistrationTimout.clearTimeout(this.user.id);

    }

    private async removeUser(user_id: string) {
        const repository = Database.instance.manager
            .getCustomRepository(UserRepository);

        await repository.removeByID(user_id);
    }

}
