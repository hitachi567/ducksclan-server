import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import sequelizeTypes from '../sequelize_types';
import { Op } from 'sequelize';
import ApiError from '../../lib/ApiError';
import { v4 } from 'uuid';

const types = sequelizeTypes();

@Table({
    tableName: 'users',
    modelName: 'User'
})
export default class User extends Model<IUser> {

    @Column(types.uuid_primary_key)
    id: string;

    @Column(types.string30_not_null_unique)
    username: string;

    @Column(types.text_not_null_unique)
    email: string;

    @Column(types.text_not_null)
    password: string;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

    @Column({ ...types.boolean_not_null, defaultValue: true })
    isDisabled: boolean;

    @Column({ ...types.boolean_not_null, defaultValue: false })
    online: boolean;

    @Column(types.date_not_null_now)
    online_date: Date;

    @Column(types.date)
    activate_date: Date;

    @Column(types.integer)
    avatar: number;

    static async addNewTestingUsers(number: number) {
        for (let i = 0; i < number; i++) {
            User.addNewTestingUser(true);
        }
    }

    static addNewTestingUser(online?: boolean) {
        const unique = User.generateID();
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

    static findByUsernameOrEmail(username: string, email: string) {
        return User.findAll({
            where: {
                [Op.or]: [
                    { username }, { email }
                ]
            }
        })
    }

    static findByID(id: string) {
        return User.findOne({ where: { id } });
    }

    static findByUsername(username: string) {
        return User.findOne({ where: { username } });
    }

    static findByEmail(email: string) {
        return User.findOne({ where: { email } });
    }

    static generateID() {
        return v4();
    }

    static checkUsername(username: string) {
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

    static checkPassword(password: string) {
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

    static checkEmail(email: string) {
        if (typeof email !== 'string') {
            throw ApiError.ValidateError('email must be string');
        }
        let string = email.trim();
        return string;
    }

}

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
    isDisabled?: boolean;
    online?: boolean;
    online_date?: Date;
    activate_date?: Date;
    avatar?: number;
}
