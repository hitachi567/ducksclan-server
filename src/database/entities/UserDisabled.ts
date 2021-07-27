import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class UserDisabled {

    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    status: number;

    @Column()
    date: string;

    @Column()
    reason: number;

    @Column()
    by: string;

    @OneToOne(() => User, user => user.id, {
        cascade: true
    })
    @JoinColumn()
    user: User;

}
