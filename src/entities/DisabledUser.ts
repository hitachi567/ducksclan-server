import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class DisabledUser {

    @PrimaryColumn({ unique: true })
    user_id: string;

    @Column()
    reason: number;

    @Column()
    by: string;

    @CreateDateColumn()
    start_date: Date = new Date();

    @Column()
    end_date?: Date;

    @UpdateDateColumn()
    updated_at: Date = new Date();

    constructor(reason: number, user_id: string, by: string) {
        this.user_id = user_id;
        this.reason = reason;
        this.by = by;
    }

}
