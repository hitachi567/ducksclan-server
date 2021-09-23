import { Column, CreatedAt, Model, Table, PrimaryKey } from 'sequelize-typescript';
import { EntitieJournal } from '../../interfaces/entities';
import sequelizeTypes from '../sequelize_types';

const types = sequelizeTypes();

@Table({
    tableName: 'journal',
    modelName: 'Journal'
})
export default class Journal extends Model<EntitieJournal> {

    @PrimaryKey
    @Column
    id: string;

    @Column(types.text)
    fingerprint: string;

    @Column(types.text)
    ip: string;

    @Column(types.text)
    user_id: string;

    @Column(types.integer_not_null)
    action: number;

    @Column(types.boolean_not_null)
    success: boolean;

    @Column(types.text)
    note: string;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

}
