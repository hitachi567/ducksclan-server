import { Column, CreatedAt, Model, Sequelize, Table } from 'sequelize-typescript';
import { Op } from 'sequelize';
import sequelizeTypes from '../sequelize_types';

const types = sequelizeTypes();

@Table({
    tableName: 'tokens',
    modelName: 'Token'
})
export default class Token extends Model<IToken> {

    @Column(types.text_primary_key)
    token: string

    @Column(types.text_not_null_unique)
    fingerprint: string;

    @Column(types.uuid_not_null)
    user_id: string;

    @Column
    ip: string;

    @CreatedAt
    @Column(types.date_not_null_now)
    created_at: Date;

    static findAllNotRelevant(user_id: string) {
        return Token.findAll({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    Sequelize.literal(`created_at + '+30 day' < current_timestamp`)
                ]
            }
        })
    }

    static async destroyNotRelevant(user_id: string) {
        const notRelevantTokens = await Token.findAllNotRelevant(user_id);
        for (const notRelevantToken of notRelevantTokens) {
            await notRelevantToken.destroy();
        }
    }

    static findByFingerprint(fingerprint: string) {
        return Token.findOne({ where: { fingerprint } })
    }

}

export interface IToken {
    token: string;
    fingerprint: string;
    user_id: string;
    ip?: string;
    created_at?: Date;
}
