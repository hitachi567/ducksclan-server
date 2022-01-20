import { Entity, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { Generator } from '@hitachi567/core';
import BaseEntity from '../database/a.base.entity';
import User from './user';

@Entity()
export default class ConfirmLink extends BaseEntity {

    constructor(user: User) {
        super();
        this.user = user;
    }

    @PrimaryColumn()
    payload: string = Generator.sequense(50);

    @OneToOne(() => User, user => user.confirmLink, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

}
