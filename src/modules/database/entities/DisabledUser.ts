import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class DisabledUser {

    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    reason: number;

    @Column()
    date: Date;

    @Column()
    by: string;

}
