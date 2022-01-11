import { day, Generator, ApiError, Timeout } from '@hitachi567/core';
import Repositories from '../repositories';
import FindUserService from './find-user';
import LinkService from './link';
import User from '../entities/user';

export const rejectRegistrationTimout = new Timeout();

export default class ConfirmationService extends FindUserService {

    // TODO: implement mail service 
    async sendMail(user: User) {

        let payload = Generator.sequense(50);
        let link = LinkService.confirm(payload);

        user.confirm_link = payload;
        await this.userRepository.save(user);

        // await MailService.sendConfirmMessage(user.email, user.username, link);

    }

    async confirmEmail(user: User) {
        try {

            user.removeConfrimLink();

            if (user.isConfirmed === true) {

                throw ApiError.Forbidden('email already confirmed');

            }

            user.confirmEmail();

        } finally {

            this.userRepository.save(user);

        }
    }

    async setTimeout(user: User) {

        const cb = (user_id: string) => new RejectRegistration().remove(user_id)

        rejectRegistrationTimout.setTimeout(user.id, cb, 7 * day('ms'));

    }

    async clearTimout(user: User) {

        try {

            rejectRegistrationTimout.clearTimeout(user.id);

        } catch (error) {

            let condition = error instanceof Error
                && error.message === 'timeout not found';

            if (!condition) {

                throw error;

            }

        }

    }

}

class RejectRegistration extends Repositories {

    async remove(user_id: string) {

        let user = await this.userRepository.findOneByID(user_id);

        if (user) {
            await this.userRepository.remove(user);
        }

    }

}
