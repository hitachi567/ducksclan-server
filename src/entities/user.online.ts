import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IUserOnline } from '../interfaces/user.interface';
import SerialEntity from '../database/a.serial.entity';
import User from './user';

@Entity()
export default class UserOnline extends SerialEntity implements IUserOnline {

    @Column()
    is_online: boolean = false;

    @OneToOne(() => User, user => user.online, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    constructor(user: User) {
        super();

        this.user = user;
    }

}
