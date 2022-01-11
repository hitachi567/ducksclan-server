import { Entity, Column } from 'typeorm';
import SerialEntity from '../database/a.serial.entity';

@Entity()
export default class UserPhoto extends SerialEntity {

    @Column({ unique: true })
    url: string;

    @Column()
    user_id: string;

    @Column()
    number: number;

    constructor(url: string, user_id: string, number: number) {
        super();
        this.url = url;
        this.user_id = user_id;
        this.number = number;
    }

}
