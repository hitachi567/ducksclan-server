import { User, UserOnline, UserProfile, ConfirmLink, } from '../entities';
import { UserFindingService } from './user.finding.service';
import Repositories from '../repositories';

export class UserCreationService extends Repositories {

    async create(email: string): Promise<{
        user: User;
        online: UserOnline;
        profile: UserProfile;
        confirmLink: ConfirmLink;
    }> {

        const service = new UserFindingService(this.manager);

        await service.checkUniqueness.ofEmail(email);

        let user = new User(email);
        let online = new UserOnline(user);
        let profile = new UserProfile(user);
        let confirmLink = new ConfirmLink(user);

        user = await this.manager.save(user);
        online = await this.manager.save(online);
        profile = await this.manager.save(profile);
        confirmLink = await this.manager.save(confirmLink);

        return {
            user,
            online,
            profile,
            confirmLink
        };

    }

}
