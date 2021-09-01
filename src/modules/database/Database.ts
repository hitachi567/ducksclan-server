import { Connection, createConnection, EntityManager } from 'typeorm';
import Log from '../../utils/Log';
import getEntities from './getEntities';

export default class Database {
    protected connection: Connection;
    manager: EntityManager;

    static async init() {
        const db = new Database();
        try {
            db.connection = await createConnection({
                type: 'sqlite',
                database: 'database.sqlite',
                synchronize: true,
                logging: false,
                entities: getEntities(),
            });
            db.manager = db.connection.manager;
        } catch (error) {
            Log.error(error);
        } finally {
            return db;
        }
    }

}
