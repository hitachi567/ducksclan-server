import { Entity, Column } from 'typeorm';
import SerialEntity from '../database/a.serial.entity';

@Entity()
export default class Journal extends SerialEntity {

    @Column()
    fingerprint: string;

    @Column({ nullable: true })
    ip?: string;

    @Column({ nullable: true })
    user_id?: string;

    @Column()
    action: number = 0;

    @Column()
    success: boolean = true;

    @Column({ nullable: true })
    note?: string;

    constructor(fingerprint: string, action: number, success: boolean) {
        super();
        this.fingerprint = fingerprint;
        this.action = action;
        this.success = success;
    }
}
