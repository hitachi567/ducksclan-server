import { Connection, createConnection, QueryRunner } from 'typeorm';
import { Transaction } from '../interfaces/database';
import User from '../entities/user';
import RefreshToken from '../entities/refresh-token';

export default class Database {
    protected static connection: Connection;

    static async connect(): Promise<void> {

        Database.connection = await createConnection({
            type: 'sqlite',
            database: './database/database.sqlite',
            entities: [User, RefreshToken]
        });

    }

    static async synchronize(): Promise<void> {

        await Database.connection.query('PRAGMA foreign_keys=OFF');
        await Database.connection.synchronize();
        await Database.connection.query('PRAGMA foreign_keys=ON');

    }

    static getQueryRunner(): QueryRunner {
        return this.connection.createQueryRunner();
    }

    static transaction<R>(callback: Transaction<R>): Promise<R> {
        return this.connection.transaction<R>(callback);
    }

    static get manager() {
        return this.connection.manager;
    }

}
