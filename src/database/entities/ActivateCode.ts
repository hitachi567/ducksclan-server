import { Column, CreatedAt, Model, Sequelize, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';
import getRandom from '../../lib/getRandom';
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

    static async destroyAllNotRelevant(user_id?: string) {
        let literal = Sequelize.literal(`created_at + '+2 day' < current_timestamp`);
        let where = user_id ? { [Op.and]: [{ user_id }, literal] } : literal;
        return ActivateCode.destroy({ where });
    }

    static generateCode() {
        return getRandom(100000, 999999);
    }

}

export interface IActrivateCode {
    user_id: string;
    code: number;
    created_at?: Date;
}
