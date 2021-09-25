import ActivateLink from '../database/entities/ActivateLink';
import User from '../database/entities/User';
import ApiError from '../lib/ApiError';
import Generator from '../lib/Generator';

export default class UserService {

    static generateID() {
        return Generator.generateUserID();
    }

    static create(user: {
        username: string,
        password: string,
        email: string
    }) {
        return new User({ ...user, id: this.generateID() }).save();
    }

    static async activate(user_id: string,) {
        const user = await User.findByID(user_id);
        if (!user) {
            throw ApiError.BadRequest('user not found');
        }
        user.isDisabled = false;
        user.activate_date = new Date();

        await ActivateLink.destroyByUserID(user_id);

        const link = await ActivateLink.findOneByUserID(user_id);
        if (link) {
            await link.destroy();
        }
        return user;
    }

    static async rejectActivation(user_id: string) {
        await ActivateLink.destroyByUserID(user_id);
        await User.destroyByID(user_id);
    }

    static async addNewTestingUsers(number: number) {
        for (let i = 0; i < number; i++) {
            await this.addNewTestingUser(true);
        }
    }

    static addNewTestingUser(online?: boolean) {
        const unique = this.generateID();
        const user = new User({
            id: unique,
            username: unique.replace(/-/g, '').substring(0, 30),
            email: unique.replace(/-/g, '').substring(0, 10) + '@ducksclan.ru',
            password: 'password',
            activate_date: new Date(),
            isDisabled: false,
            online: online === true
        });
        return user.save()
    }

    static async checkingUniquenessUsernameAndEmail(username: string, email: string) {
        const result = await User.findByUsernameOrEmail(username, email);
        if (result.length > 0) {
            throw ApiError.ValidateError('username or email occupied');
        }
    }

}
