import { IUser } from '../interfaces/database.interfaces';
import { IUserCreate } from '../interfaces/user.interfaces';
import { PoolClient } from 'pg';
import { database } from '..';

export default class UserDatabase {

    constructor(protected client: PoolClient) { }

    static async getInstance() {
        return new UserDatabase(await database.getClient());
    }

    close() {
        this.client.release();
    }

    findOne() {
        const client = this.client;

        function byID(id: string) {
            const sql = 'select * from user where id=$1';
            return client.query<IUser>(sql, [id]);
        }

        function byUsername(username: string) {
            const sql = 'select * from user where "username"=$1';
            return client.query<IUser>(sql, [username]);
        }

        function byEmail(email: string) {
            const sql = 'select * from user where email=$1';
            return client.query<IUser>(sql, [email]);
        }

        function byUsernameAndEmail(username: string, email: string) {
            const sql = 'select * from user where username=$1 and email=$2';
            return client.query<IUser>(sql, [username, email]);
        }

        function byUsernameOrEmail(username: string, email: string) {
            const sql = 'select * from user where username=$1 or email=$2';
            return client.query<IUser>(sql, [username, email]);
        }

        return {
            byID,
            byEmail,
            byUsername,
            byUsernameAndEmail,
            byUsernameOrEmail
        }
    }

    async create(user: IUserCreate) {
        const { id, username, email, password } = user;
        const fields = 'id, username, email, password, isDisabled';
        const sql1 = `insert into "user"(${fields}) values($1, $2, $3, $4, $5)`;
        const sql2 = 'insert into "user_online"(user_id, status) values($1, $2)';
        try {
            await this.client.query('begin');
            await this.client.query(sql1, [id, username, email, password, true]);
            await this.client.query(sql2, [id, false]);
            await this.client.query('commit');
        } catch (error) {
            await this.client.query('rollback');
            throw error;
        }
    }

    setOnline(user_id: string, value: boolean) {
        const sql = 'update "user_online" set status=$2, date=current_timestamp where user_id=$1';
        return this.client.query(sql, [user_id, value]);
    }

    getOnline(user_id: string) {
        const sql = 'select user_id, status, date from user_online where user_id=$1';
        return this.client.query(sql, [user_id]);
    }

    changeUsername(user_id: string, username: string) {
        const sql = 'update "user" set username=$2 where user_id=$1';
        return this.client.query(sql, [user_id, username]);
    }

    changePassword(user_id: string, password: string) {
        const sql = 'update "user" set password=$2 where user_id=$1';
        return this.client.query(sql, [user_id, password]);
    }

    createActivateCode(user_id: string, code: string) {
        const sql = 'insert into "activate_code"(user_id, code) values($1, $2)';
        return this.client.query(sql, [user_id, code]);
    }

    updateActivateCode(user_id: string, code: string) {
        const sql = 'update "activate_code" set code=$2, created_at=current_timestamp where user_id=$1';
        return this.client.query(sql, [user_id, code]);
    }

    deleteActivateCode(user_id: string) {
        const sql = 'delete from "activate_code" where user_id=$1';
        return this.client.query(sql, [user_id]);
    }

    activate(user_id: string) {
        const sql = 'update "user" set activate_date=current_timestamp where user_id=$1';
        return this.client.query(sql, [user_id]);
    }

    ban(user_id: string, by: string, interval: Date, reason: number) {
        const sql = `insert into "disabled_user"(user_id, by, end_date, reason)
            values($1, $2, current_date + $3, $4)`;
        return this.client.query(sql, [user_id, by, interval, reason]);
    }

}
