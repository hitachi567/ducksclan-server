import { Entity, OneToOne, JoinColumn, Column } from 'typeorm';
import { IUserProfile } from '../interfaces';
import SerialEntity from '../database/a.serial.entity';
import User from './user';

@Entity()
export default class UserProfile extends SerialEntity implements IUserProfile {

    constructor(user: User) {
        super();
        this.user = user;
    }

    @Column({ type: 'text', nullable: true })
    first_name: string | null = null;

    @Column({ type: 'text', nullable: true })
    second_name: string | null = null;

    @Column({ type: 'text', nullable: true })
    bio: string | null = null;

    @Column({ type: 'text', nullable: true })
    department: string | null = null;

    @Column({ type: 'text', nullable: true })
    position: string | null = null;

    @OneToOne(() => User, user => user.profile, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

}
