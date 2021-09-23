import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import { EntitieDisabledUser } from '../../interfaces/entities';
import sequelizeTypes from '../sequelize_types';

const types = sequelizeTypes();

@Table({
    tableName: 'disabled_users',
    modelName: 'DisabledUser'
})
export default class DisabledUser extends Model<EntitieDisabledUser> {

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
