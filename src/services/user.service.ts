import { v4 } from 'uuid';
import UserDatabase from '../database/user.database';
import { IUserCreate } from '../interfaces/user.interfaces';

export default class UserService {
    // protected connection = new UserDatabase(await UserDatabase.init());

    generateUserId() {
        return 'user-' + v4();
    }

    generateTestingUserData(): IUserCreate {
        const unique = v4();
        return {
            id: 'user-' + unique,
            username: unique.replace(/-/g, ''),
            email: unique.replace(/-/g, '').substring(0, 10) + '@gmail.com',
            password: 'password'
        }
    }

    async addNewTestingUsers(number: number) {
        const db = await UserDatabase.init();
        for (let i = 0; i < number; i++) {
            db.create(this.generateTestingUserData());
        }
        db.close();
    }

}