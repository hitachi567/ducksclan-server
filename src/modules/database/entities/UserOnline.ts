import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class UserOnline {

    @PrimaryColumn({ unique: true })
    user_id: string;

    @Column()
    status: boolean;

    @Column()
    date: Date;

}
