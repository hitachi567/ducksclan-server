import getSql from '../getSql';

export default class UserPhoto {
    id: string;
    user_id: string;
    number: number;
    url: string;
    date: Date;
    static prepare: string = getSql('./user_photo.sql');
}
