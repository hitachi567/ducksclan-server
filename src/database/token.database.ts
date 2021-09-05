import Database from './Database';
import { IToken } from '../interfaces/database.interfaces';
import { ITokenSave } from '../interfaces/token.interfaces';

export default class TokenDatabase extends Database {

    saveToken(data: ITokenSave) {
        const fields = 'user_id, fingerprint, token, date';
        let param = [data.user_id, data.fingerprint, data.token, data.date];

        if (data.ip !== undefined) {
            const sql = 'insert into token (' + fields + ', ip) values (?, ?, ?, ?, ?)';
            return this.db.run(sql, param, data.ip);
        } else {
            const sql = 'insert into token (' + fields + ') values (?, ?, ?, ?)';
            return this.db.run(sql, param);
        }
    }

    getAll() {
        const sql = 'select * from token';
        return this.db.all<IToken[]>(sql);
    }

    get foundToken() {
        const db = this.db;

        function byToken(token: string) {
            const sql = 'select * from token where token=?';
            return db.get<IToken>(sql, token);
        }

        function byFingerprint(fingerprint: string) {
            const sql = 'select * from token where fingerprint=?';
            return db.get<IToken>(sql, fingerprint);
        }

        return { byFingerprint, byToken }
    }

    get foundTokens() {
        const db = this.db;

        function byUserID(user_id: string) {
            const sql = 'select * from token where user_id=?';
            return db.all<IToken[]>(sql, user_id);
        }

        function byIP(ip: string) {
            const sql = 'select * from token where ip=?';
            return db.all<IToken[]>(sql, ip);
        }

        function notRelevant(user_id?: string) {
            const sql = 'select * from token where date(date, "+30 days")<date("now")';
            if (user_id !== undefined) {
                return db.all<IToken[]>(sql + ' and user_id=?', user_id);
            }
            return db.all<IToken[]>(sql);
        }

        return { byUserID, byIP, notRelevant }
    }

    get removeToken() {
        const db = this.db;

        function byToken(token: string) {
            const sql = 'delete from token where token=?';
            return db.run(sql, token);
        }

        function byFingerprint(fingerprint: string) {
            const sql = 'delete from token where fingerprint=?';
            return db.run(sql, fingerprint);
        }

        return { byFingerprint, byToken }
    }

    get removeTokens() {
        const db = this.db;

        function byUserID(user_id: string) {
            const sql = 'delete from token where user_id=?';
            return db.run(sql, user_id);
        }

        function byIP(ip: string) {
            const sql = 'delete from token where ip=?';
            return db.run(sql, ip);
        }

        function notRelevant(user_id?: string) {
            const sql = 'delete from token where date(date, "+30 days")<date("now")';
            if (user_id !== undefined) {
                return db.run(sql + ' and user_id=?', user_id);
            }
            return db.run(sql);
        }

        return { byUserID, byIP, notRelevant }
    }

    static async init() {
        return new TokenDatabase(await Database.getConnection());
    }

}
