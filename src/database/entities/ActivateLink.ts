import { Column, CreatedAt, Model, Sequelize, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';
import sequelizeTypes from '../sequelize_types';
import { EntitieActivateLink } from '../../interfaces/entities';

const types = sequelizeTypes();

@Table({
    tableName: 'activate_links',
    modelName: 'ActivateLink'
})
export default class ActivateLink extends Model<EntitieActivateLink> {

    @Column(types.uuid_primary_key)
    user_id: string;

    @Column(types.text_not_null_unique)
    link: string;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

    static async destroyAllNotRelevant(user_id?: string) {
        let literal = Sequelize.literal(`created_at + '+7 day' < current_timestamp`);
        let where = user_id ? { [Op.and]: [{ user_id }, literal] } : literal;
        return ActivateLink.destroy({ where });
    }

    static destroyByUserID(user_id: string) {
        return ActivateLink.destroy({ where: { user_id } });
    }

    static findOneByUserID(user_id: string) {
        return ActivateLink.findOne({ where: { user_id } });
    }

    static findOneByLink(link: string) {
        return ActivateLink.findOne({ where: { link } });
    }
}
