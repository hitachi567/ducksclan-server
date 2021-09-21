import { Column, CreatedAt, Model, Sequelize, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';
import sequelizeTypes from '../sequelize_types';
import { randomBytes } from 'crypto';

const types = sequelizeTypes();

@Table({
    tableName: 'destruction_links',
    modelName: 'DestructionLink'
})
export default class DestructionLink extends Model<IDestructionLink> {

    @Column(types.uuid_primary_key)
    user_id: string;

    @Column(types.text_not_null_unique)
    link: string;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

    static async destroyAllNotRelevant(user_id?: string) {
        let literal = Sequelize.literal(`created_at + '+2 day' < current_timestamp`);
        let where = user_id ? { [Op.and]: [{ user_id }, literal] } : literal;
        return DestructionLink.destroy({ where });
    }

    static generateLinkPayload() {
        return randomBytes(30).toString('hex')
    }

}

export interface IDestructionLink {
    user_id: string;
    link: string;
    created_at?: Date;
}
