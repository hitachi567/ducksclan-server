import getSql from '../getSql';

export default class Token {
    id: string;
    user_id: string;
    fingerprint: string;
    ip?: string;
    token: string;
    date: Date;
    static prepare: string = getSql('./token.sql');
}
