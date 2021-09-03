import getSql from '../getSql';

export default class DisabledUser {
    user_id: string;
    reason?: number;
    date: Date;
    by: string;
    static prepare: string = getSql('./disabled_user.sql');

}
