import { Sequelize } from 'sequelize-typescript';
import { config } from '..';
import ActivateCode from './entities/ActivateCode';
import DisabledUser from './entities/DisabledUser';
import Journal from './entities/Journal';
import Token from './entities/Token';
import User from './entities/User';
import UserPhoto from './entities/UserPhoto';
import Log from '../lib/Log';

export default class Database {
    protected sequelize = new Sequelize({
        dialect: 'postgres',
        dialectOptions: config.pg,
        logging: sql => Log.db(sql),
        models: [
            User,
            UserPhoto,
            Token,
            DisabledUser,
            ActivateCode,
            Journal
        ]
    });

    async authenticate() {
        await this.sequelize.authenticate();
    }

    async sync() {
        await this.sequelize.sync({ alter: true });
    }
}
