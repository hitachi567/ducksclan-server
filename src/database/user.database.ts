import Database from './Database';
import { IUser, IUserOnline } from '../interfaces/database.interfaces';
import { IUserCreate, IUserOnlineGet } from '../interfaces/user.interfaces';

export default class UserDatabase extends Database {

    findOne() {
        const db = this.db;

        function byID(id: string) {
            const sql = 'select * from user where id=?';
            return db.get<IUser>(sql, id);
        }

        function byUsername(username: string) {
            const sql = 'select * from user where username=?';
            return db.get<IUser>(sql, username);
        }

        function byEmail(email: string) {
            const sql = 'select * from user where email=?';
            return db.get<IUser>(sql, email);
        }

        function byUsernameAndEmail(username: string, email: string) {
            const sql = 'select * from user where username=? and email=?';
            return db.get<IUser>(sql, username, email);
        }

        function byUsernameOrEmail(username: string, email: string) {
            const sql = 'select * from user where username=? or email=?';
            return db.get<IUser>(sql, username, email);
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
        const sql = 'insert into user (id, username, email, password, create_date) values(?, ?, ?, ?, ?)';
        const data = [user.id, user.username, user.email, user.password, new Date().toISOString()];
        await this.db.run(sql, data);
        await this.insertOnline(user.id, false);
    }

    setOnline(user_id: string, value: boolean) {

        const sql = 'insert into user (id, username, email, password, create_date) values(?, ?, ?, ?, ?)';
        // const data = [user_id, user.username, user.email, user.password, new Date().toISOString()];
        return this.db.run(sql, data);
    }

    async getOnline(user_id: string): Promise<IUserOnline> {
        const sql = `
            select
                user_id,
                date,
                case status when 1 then true else false end status
            from user_online where user_id=?
        `;
        const result = await this.db.get<IUserOnlineGet>(sql, user_id);
        if (result) {
            return {
                user_id,
                status: result.status === 1,
                date: new Date(result.date)
            }
        }

        await this.insertOnline(user_id, false);
        return this.getOnline(user_id);
    }

    protected insertOnline(user_id: string, value: boolean) {
        const sql = 'insert into user_online (user_id, status, date) values(?, ?, strftime("%Y-%m-%dT%H:%M:%fZ"))';
        const data = [user_id, value ? 1 : 0];
        return this.db.run(sql, data);
    }

    protected updateOnline(user_id: string, value: boolean) {
        const sql = 'update user_online set status=?, date=strftime("%Y-%m-%dT%H:%M:%fZ")) where user_id=?';
        const data = [value ? 1 : 0, user_id];
        return this.db.run(sql, data);
    }

    static async init() {
        return new UserDatabase(await Database.getConnection());
    }

}
