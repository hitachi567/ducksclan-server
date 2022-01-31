import { Connection, createConnection, QueryRunner, EntitySchema } from 'typeorm';
import { Transaction } from '../interfaces';

export class Database {

    protected connection: Connection;

    constructor(connection: Connection) {

        this.connection = connection;

    }

    protected static connect(entities: EntitySchema[]): Promise<Connection> {
        return createConnection({
            type: 'sqlite',
            database: './database/database.sqlite',
            entities
        });
    }

    async synchronize(): Promise<void> {
        await this.connection.query('PRAGMA foreign_keys=OFF');
        await this.connection.synchronize();
        await this.connection.query('PRAGMA foreign_keys=ON');
    }

    getQueryRunner(): QueryRunner {
        return this.connection.createQueryRunner();
    }

    transaction<Returned = any>(callback: Transaction<Returned>): Promise<Returned> {
        return this.connection.transaction<Returned>(callback);
    }

    get manager() {
        return this.connection.manager;
    }

}
