import Database from './Database';
import { IUser } from '../interfaces/database.interfaces';
import { IUserCreate } from '../interfaces/user.interfaces';

export default class UserDatabase extends Database {
    get getUser() {
        const db = this.db;

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
            byEmail,
            byUsername,
            byUsernameAndEmail,
            byUsernameOrEmail
        }
    }

    createUser(user: IUserCreate) {
        const sql = 'insert into user (id, username, email, password, create_date) values(?, ?, ?, ?, ?)';
        const data = [user.id, user.username, user.email, user.password, new Date().toISOString()];
        return this.db.run(sql, data);
    }

    static async init() {
        return new UserDatabase(await Database.getConnection());
    }

}
