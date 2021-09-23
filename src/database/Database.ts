import { Sequelize } from 'sequelize-typescript';
import { config } from '..';
import ActivateLink from './entities/ActivateLink';
import DisabledUser from './entities/DisabledUser';
import Journal from './entities/Journal';
import Token from './entities/Token';
import User from './entities/User';
import UserPhoto from './entities/UserPhoto';
import Log from '../lib/Log';

export default class Database {
    protected static sequelize: Sequelize;

    static async init() {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            dialectOptions: config.pg,
            logging: sql => Log.db(sql),
            models: [
                User,
                UserPhoto,
                Token,
                DisabledUser,
                ActivateLink,
                Journal
            ]
        });
        await this.sequelize.authenticate();
        await this.sequelize.sync({ alter: true });
    }

    static drop() {
        return this.sequelize.drop()
    }

}
