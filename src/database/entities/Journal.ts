import getSql from '../getSql';

export default class Journal {
    id: number;
    fingerprint?: string;
    ip?: string;
    user_id?: string;
    action?: string;
    static prepare: string = getSql('./journal.sql');
}
