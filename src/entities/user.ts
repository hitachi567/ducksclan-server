import { UserInterface, UserJSON, UserInfo, UserProfile } from '../interfaces';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Generator } from '@hitachi567/core';
import BaseEntity from '../database/a.base.entity';
import RefreshToken from './refresh-token';

@Entity()
export default class User extends BaseEntity implements UserInterface {

    constructor(email: string, username: string) {

        super();

        this.email = email;
        this.username = username;

    }

    static init(email: string) {

        return new User(email, email.split('@')[0]);

    }

    toJSON(): UserJSON {
        return {
            info: this.info,
            profile: this.profile,
            onlineStatus: {
                isOnline: this.isOnline,
                online_updated_at: this.online_updated_at
            },
            confirmStatus: {
                isConfirmed: this.isConfirmed,
                confirmed_at: this.confirmed_at
            },
            banStatus: {
                isBanned: this.isBanned,
                banned_at: this.banned_at
            }
        }
    }

    get info(): UserInfo {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            password: this.password,
            confirm_link: this.confirm_link,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }

    get profile(): UserProfile {
        return {
            name: this.name,
            bio: this.bio
        }
    }

    setOnline() {
        this.isOnline = true;
        this.online_updated_at = new Date();
    }

    setOffline() {
        this.isOnline = false;
        this.online_updated_at = new Date();
    }

    confirmEmail() {
        this.isConfirmed = true;
        this.confirmed_at = new Date();
    }

    ban() {
        this.isBanned = true;
        this.banned_at = new Date();
    }

    unban() {
        this.isBanned = false;
        this.banned_at = undefined;
    }

    // info

    @PrimaryColumn({ unique: true })
    id: string = Generator.uuid();

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    password?: string;

    // email confirm status

    @Column()
    isConfirmed: boolean = false;

    @Column({ nullable: true })
    confirmed_at?: Date;

    @Column({ type: 'text', nullable: true })
    confirm_link?: string | null;

    // online status

    @Column()
    isOnline: boolean = false;

    @Column()
    online_updated_at: Date = new Date();

    // ban status

    @Column()
    isBanned: boolean = true;

    @Column({ nullable: true })
    banned_at?: Date = new Date();

    // profile

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    bio?: string;

    // relations

    @OneToMany(() => RefreshToken, token => token.user)
    tokens!: RefreshToken[];

}
