import getSql from '../getSql';

export default class UserOnline {
    user_id: string;
    status: boolean;
    date: Date;
    static prepare: string = getSql('./user_online.sql');
}
