import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import sequelizeTypes from '../sequelize_types';

const types = sequelizeTypes();

@Table({
    tableName: 'disabled_users',
    modelName: 'DisabledUser'
})
export default class DisabledUser extends Model<IDisabledUser> {

    @Column(types.uuid_primary_key)
    user_id: string;

    @Column(types.uuid_not_null)
    by: string;

    @Column(types.integer_not_null)
    reason: number;

    @CreatedAt
    @Column(types.date_not_null_now)
    start_date: Date;

    @Column(types.date)
    end_date: Date;

}

export interface IDisabledUser {
    user_id: string;
    by: string;
    reason: number;
    start_date?: Date;
    end_date?: Date;
}
