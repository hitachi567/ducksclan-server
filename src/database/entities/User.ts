import getSql from '../getSql';

export default class User {
    id: string;
    username: string;
    email: string;
    password: string;
    create_date: Date;
    static prepare: string = getSql('./user.sql');
}
