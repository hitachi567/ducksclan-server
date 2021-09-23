import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';
import { EntitieUserPhoto } from '../../interfaces/entities';
import sequelizeTypes from '../sequelize_types';

const types = sequelizeTypes();

@Table({
    tableName: 'user_photos',
    modelName: 'UserPhoto'
})
export default class UserPhoto extends Model<EntitieUserPhoto> {

    @Column(types.text_primary_key)
    url: string;

    @Column(types.uuid_not_null)
    user_id: string;

    @Column(types.integer_not_null)
    number: number;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

}
