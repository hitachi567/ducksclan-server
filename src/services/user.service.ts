import { v4 } from 'uuid';
import UserDatabase from '../database/user.database';

export default class UserService {
    protected connection = new UserDatabase();

    generateUserId() {
        return 'user-' + v4();
    }

    generateTestingUserData() {
        const unique = v4();
        return {
            id: 'user-' + unique,
            username: unique.replace(/-/g, ''),
            email: unique.replace(/-/g, '').substring(0, 10) + '@gmail.com',
            password: 'password'
        }
    }

}