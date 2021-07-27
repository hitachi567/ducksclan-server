import { Connection, createConnection } from 'typeorm';
import Log from '../utils/Log';
import getEntities from './getEntities';

export default class Database {
    protected connection: Connection;

    constructor() {
        // .then(async connection => {
        //     // const user = new User();
        //     // user.firstName = "Timber";
        //     // user.lastName = "Saw";
        //     // user.age = 25;
        //     // await connection.manager.save(user);
        //     // console.log("Saved a new user with id: " + user.id);
        //     const users = await connection.manager.findOne(User, 5);
        //     console.log("Loaded users: ", users);
        // }).catch(error => console.log(error));
    }

    static async init(databasePath: string) {
        const db = new Database();
        try {
            db.connection = await createConnection({
                type: 'sqlite',
                database: databasePath,
                synchronize: true,
                logging: false,
                entities: getEntities(),
            });
        } catch (error) {
            Log.error(error);
        } finally {
            return db;
        }
    }

}


