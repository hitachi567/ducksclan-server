import ApiError from '../lib/ApiError';

export default class UserService {

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