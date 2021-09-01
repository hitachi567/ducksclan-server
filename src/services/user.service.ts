import { Connection, getConnection } from 'typeorm';
import { v4 } from 'uuid';
import User from '../modules/database/entities/User';

export default class UserService {
    protected connection: Connection = getConnection();

    get getUser() {
        const manager = this.connection.manager;

        function byUsername(username: string) {
            return manager.findOne(User, {
                where: { username }
            });
        }

        function byEmail(email: string) {
            return manager.findOne(User, {
                where: { email }
            });
        }

        function byUsernameAndEmail(username: string, email: string) {
            return manager.findOne(User, {
                where: { username, email }
            });
        }

        function byUsernameOrEmail(username: string, email: string) {
            return manager.findOne(User, {
                where: [{ username }, { email }]
            });
        }

        return {
            byEmail,
            byUsername,
            byUsernameAndEmail,
            byUsernameOrEmail
        }
    }

    async createUser(data: {
        user_id: string,
        username: string,
        email: string,
        hashedPassword: string
    }) {
        const newUser = new User();
        newUser.id = data.user_id;
        newUser.username = data.username;
        newUser.email = data.email;
        newUser.password = data.hashedPassword;
        newUser.create_date = new Date();
        await this.connection.manager.save(newUser);
    }

    // async getUser(id: string) {
    //     const user = await this.manager.findOne(User, id);
    //     if (user) {
    //         const online = await this.manager.findOne(UserOnline, id);
    //         const photos = await this.manager.find(UserPhoto, {
    //             where: { user_id: id }
    //         });
    //         const disabled = await this.manager.findOne(DisabledUser, id);

    //         return { user, online, photos, disabled };
    //     }
    // }

    validateUsernameCharacters() {
        
    }

    generateUserId() {
        return 'user-' + v4();
    }

    generateTestingUserData() {
        const unique = v4();
        return {
            id: 'user-' + unique,
            username: unique.replace(/-/g, ''),
            email: unique.replace(/-/g, '').substring(0, 10) + '@gmail.com',
            firstname: 'testing user',
            password: 'password'
        }
    }



    // changePassword(userId: string, oldPassword: string, newPassword: string) {

    // }

    // changeUsername(userId: string, newUsername: string) {

    // }

    // deleteAccount(userId: string) {

    // }

    // disableAccount() {

    // }
}