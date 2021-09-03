import getSql from '../getSql';

export default class ActrivateCode {
    user_id: string;
    code: number;
    date: Date;
    static prepare: string = getSql('./activate_code.sql');
}
