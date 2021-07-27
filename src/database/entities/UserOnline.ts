import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, Unique } from 'typeorm';
import User from './User';

@Entity()
export default class UserOnline {

    @PrimaryColumn({ unique: true })
    @Unique()
    id: string;

    @Column()
    status: number;

    @Column()
    date: string;

    @OneToOne(() => User, user => user.id, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

}
