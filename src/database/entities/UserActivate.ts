import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class UserActivate {

    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    status: number;

    @Column()
    date: string;

    @Column()
    code: string;

    @OneToOne(() => User, user => user.id, {
        cascade: true,
    })
    @JoinColumn()
    user: User;

}
