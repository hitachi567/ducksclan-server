import { Entity, PrimaryColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Generator } from '@hitachi567/core';
import { IUser } from '../interfaces';
import BaseEntity from '../database/a.base.entity';
import ConfirmLink from './confirm.link';
import TokenRefresh from './token.refresh';
import UserOnline from './user.online';
import UserProfile from './user.profile';

@Entity()
export default class User extends BaseEntity implements IUser {

    @PrimaryColumn({ unique: true })
    id: string = Generator.uuid();

    @Column({ unique: true })
    email!: string;

    @Column({ type: 'text', nullable: true, unique: true })
    username: string | null = null;

    @Column({ type: 'text', nullable: true })
    password: string | null = null;

    @Column({ type: 'datetime', nullable: true })
    banned_at: Date | null = null;

    @Column({ type: 'datetime', nullable: true })
    confirmed_at: Date | null = null;

    // relations

    @OneToMany(() => TokenRefresh, token => token.user)
    tokens!: TokenRefresh[];

    @OneToOne(() => ConfirmLink, link => link.user)
    confirmLink!: ConfirmLink;

    @OneToOne(() => UserOnline, online => online.user)
    online!: UserOnline;

    @OneToOne(() => UserProfile, profile => profile.user)
    profile!: UserProfile;

    constructor(email: string) {
        super();

        this.email = email;
    }

}
