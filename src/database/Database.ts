import { open } from 'sqlite';
import { SqliteDB } from '../utils/types';
import { DB_OPTIONS } from '../utils/consts';
import { sqlTables } from './createTables';
import CustomError from '../utils/CustomError';
import Log from '../utils/Log';

export default class Database {
    protected db: SqliteDB;

    async connect() {
        try {
            this.db = await open({
                ...DB_OPTIONS
            });
            await this.initTables();
            Log.info('connect to database');
        } catch (error) {
            Log.error(error.message);
        } finally {
            return this;
        }
    }

    async disconnect() {
        try {
            await this.db?.close();
            Log.info('disconnect from database');
        } catch (error) {
            Log.error(error.message);
        }
    }

    get() {
        return {
            tables: () => this.tables(),
            user_id: {
                byUsername: (username: string) => this.getUserID('username', username),
                byEmail: (email: string) => this.getUserID('email', email)
            }
        }
    }

    private async initTables() {
        try {
            for (const query of sqlTables) {
                await this.db.run(query);
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async tables() {
        Log.info('getting tables from database');
        const query = `SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%';`;
        try {
            const result = await this.db?.all<{ name: string }[]>(query);
            return result?.map(v => v.name);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async getUserID(by: 'username' | 'email', value: string) {
        Log.info('getting user_id by ' + by + ' from database');
        let query = 'SELECT user_id FROM users_unique WHERE ' + by + ' = ?;';
        try {
            const data = await this.db.all<{ user_id: string }[]>(query, value);
            switch (data.length) {
                case 0:
                    return undefined;
                case 1:
                    return data[0].user_id;
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected handleError(error: any) {
        if (error instanceof CustomError) {
            return error;
        } else if (error instanceof Error) {
            return new CustomError('database error', error.message);
        } else {
            error.message = 'unknown error: ' + error.message
            return new CustomError('other error', error.message);
        }
    }
}
