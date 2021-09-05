import sqlite, { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import getSql from './getSql';

const config = {
    filename: './database.sqlite',
    driver: sqlite3.Database
};

export default class Database {
    constructor(protected db: sqlite.Database) { }

    close() {
        this.db.close();
    }

    protected static async getConnection() {
        const db = await open(config);
        await db.run(getSql('./user.sql'));
        await db.run(getSql('./user_online.sql'));
        await db.run(getSql('./user_photo.sql'));
        await db.run(getSql('./disabled_user.sql'));
        await db.run(getSql('./activate_code.sql'));
        await db.run(getSql('./token.sql'));
        await db.run(getSql('./journal.sql'));
        return db;
    }

    static async init() {
        return new Database(await Database.getConnection());
    }
}
