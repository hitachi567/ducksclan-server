import { v4 } from 'uuid';
import UserDatabase from '../database/user.database';
import { IUserCreate } from '../interfaces/user.interfaces';
import ApiError from '../utils/ApiError';

export default class UserService {

    generateUserID() {
        return v4();
    }

    generateTestingUserData(): IUserCreate {
        const unique = v4();
        return {
            id: unique,
            username: unique.replace(/-/g, '').substring(0, 30),
            email: unique.replace(/-/g, '').substring(0, 10) + '@ducksclan.ru',
            password: 'password'
        }
    }

    async addNewTestingUsers(number: number) {
        const db = await UserDatabase.getInstance();
        for (let i = 0; i < number; i++) {
            await db.create(this.generateTestingUserData());
        }
        db.close();
    }

    async create(
        id: string,
        username: string,
        password: string,
        email: string
    ) {
        const client = await UserDatabase.getInstance();
        try {
            await client.create({ id, username, password, email });
        } catch (e) {
            
        } finally {
            client.close();
        }
    }

    checkUsername(username: string) {
        if (typeof username !== 'string') {
            throw ApiError.ValidateError('username must be string');
        }
        let string = username.trim();
        if (string.length < 3) {
            throw ApiError.ValidateError('username must be greater than or equal to 3');
        }
        if (string.length > 30) {
            throw ApiError.ValidateError('username must be less than or equal to 30');
        }
        if (string.match(/[^a-z0-9_]/gi)) {
            throw ApiError.ValidateError('username must contain only alphanumeric latin characters including underscore');
        }
        return string;
    }

    checkPassword(password: string) {
        if (typeof password !== 'string') {
            throw ApiError.ValidateError('password must be string');
        }
        let string = password.trim();
        if (string.length < 3) {
            throw ApiError.ValidateError('password must be greater than or equal to 3');
        }
        if (string.length > 50) {
            throw ApiError.ValidateError('password must be less than or equal to 50');
        }
        return string;
    }

    checkEmail(email: string) {
        if (typeof email !== 'string') {
            throw ApiError.ValidateError('email must be string');
        }
        let string = email.trim();
        return string;
    }

}