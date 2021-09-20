import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import sequelizeTypes from '../sequelize_types';

const types = sequelizeTypes();

@Table({
    tableName: 'activate_codes',
    modelName: 'ActivateCode'
})
export default class ActivateCode extends Model<IActrivateCode> {

    @Column(types.uuid_primary_key)
    user_id: string;

    @Column(types.integer_not_null)
    code: number;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

}

export interface IActrivateCode {
    user_id: string;
    code: number;
    created_at?: Date;
}
