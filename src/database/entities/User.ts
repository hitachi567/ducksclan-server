import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';
import sequelizeTypes from '../sequelize_types';
import { EntitieUser } from '../../interfaces/entities';

const types = sequelizeTypes();

@Table({
    tableName: 'users',
    modelName: 'User'
})
export default class User extends Model<EntitieUser> {

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

    static findByID(id: string) {
        return User.findOne({ where: { id } });
    }

    static findByUsername(username: string) {
        return User.findOne({ where: { username } });
    }

    static findByEmail(email: string) {
        return User.findOne({ where: { email } });
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

    static destroyByID(id: string) {
        return User.destroy({ where: { id } });
    }

}
