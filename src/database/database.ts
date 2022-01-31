import { Connection, createConnection, QueryRunner, EntitySchema } from 'typeorm';
import { Transaction } from '../interfaces';

export default class Database {

    static instance: Database;

    protected constructor(
        protected connection: Connection
    ) { }

    static async init(entities: EntitySchema[]) {

        if (this.instance) {

            throw new Error('reinitialization is prohibited')

        }

        const connection = await createConnection({
            type: 'sqlite',
            database: './database/database.sqlite',
            entities
        });

        this.instance = new Database(connection);

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
