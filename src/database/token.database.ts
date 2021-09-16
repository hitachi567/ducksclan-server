import { IToken } from '../interfaces/database.interfaces';
import { ITokenSave } from '../interfaces/token.interfaces';
import { PoolClient } from 'pg';
import { database } from '..';

export default class TokenDatabase {

    constructor(protected client: PoolClient) { }

    static async getInstance() {
        return new TokenDatabase(await database.getClient());
    }

    close() {
        this.client.release();
    }

    saveToken(data: ITokenSave) {
        const { user_id, fingerprint, token, date, ip } = data;
        let sql = 'insert into token (user_id, fingerprint, token, date';
        let prm = [user_id, fingerprint, token, date];

        if (ip !== undefined) {
            sql += ', ip) values ($1, $2, $3, $4, $5)';
            prm.push(ip);
        } else {
            sql += ') values ($1, $2, $3, $4)';
        }

        return this.client.query(sql, prm);
    }

    findAll() {
        const sql = 'select * from token';
        return this.client.query(sql);
    }

    findOne() {
        const client = this.client;

        function byToken(token: string) {
            const sql = 'select * from token where token=$1';
            return client.query<IToken>(sql, [token]);
        }

        function byFingerprint(fingerprint: string) {
            const sql = 'select * from token where fingerprint=$1';
            return client.query<IToken>(sql, [fingerprint]);
        }

        return {
            byFingerprint,
            byToken
        }
    }

    findMany() {
        const client = this.client;

        function byUserID(user_id: string) {
            const sql = 'select * from token where user_id=$1';
            return client.query<IToken[]>(sql, [user_id]);
        }

        function byIP(ip: string) {
            const sql = 'select * from token where ip=$1';
            return client.query<IToken[]>(sql, [ip]);
        }

        function notRelevant(user_id?: string) {
            const sql = `select * from token where created_at + '+30 day' < current_timestamp`;
            if (user_id !== undefined) {
                return client.query<IToken[]>(sql + ' and user_id=$1', [user_id]);
            }
            return client.query<IToken[]>(sql);
        }

        return { byUserID, byIP, notRelevant }
    }

    destroyOne() {
        const client = this.client;

        function byToken(token: string) {
            const sql = 'delete from token where token=$1';
            return client.query(sql, [token]);
        }

        function byFingerprint(fingerprint: string) {
            const sql = 'delete from token where fingerprint=$1';
            return client.query(sql, [fingerprint]);
        }

        return { byFingerprint, byToken }
    }

    destroyMany() {
        const client = this.client;

        function byUserID(user_id: string) {
            const sql = 'delete from token where user_id=$1';
            return client.query(sql, [user_id]);
        }

        function byIP(ip: string) {
            const sql = 'delete from token where ip=$1';
            return client.query(sql, [ip]);
        }

        function notRelevant(user_id?: string) {
            const sql = `delete from token where created_at + '+30 day' < current_timestamp`;
            if (user_id !== undefined) {
                return client.query(sql + ' and user_id=$1', [user_id]);
            }
            return client.query(sql);
        }

        return { byUserID, byIP, notRelevant }
    }

}
