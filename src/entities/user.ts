import { UserInterface, UserJSON, UserInfo, UserProfile } from '../interfaces/user.interface';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Generator } from '@hitachi567/core';
import BaseEntity from '../database/a.base.entity';

@Entity()
export default class User extends BaseEntity implements UserInterface {

    constructor(email: string) {

        super();

        this.email = email;
        this.username = email.split('@')[0];

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
            confirm_link: this.confirm_link
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
        this.confirm_link = null;
        this.confirmed_at = new Date();
    }

    ban() {
        this.isBanned = true;
        this.banned_at = new Date();
    }

    unban() {
        this.isBanned = false;
        this.banned_at = null;
    }

    // info

    @PrimaryColumn({ unique: true })
    id: string = Generator.uuid();

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    password: string | null = null;

    // email confirm status

    @Column()
    isConfirmed: boolean = false;

    @Column({ nullable: true })
    confirmed_at: Date | null = null;

    @Column({ type: 'text', nullable: true })
    confirm_link: string | null = null;

    // online status

    @Column()
    isOnline: boolean = false;

    @Column()
    online_updated_at: Date = new Date();

    // ban status

    @Column()
    isBanned: boolean = true;

    @Column({ nullable: true })
    banned_at: Date | null = new Date();

    // profile

    @Column({ nullable: true })
    name: string | null = null;

    @Column({ nullable: true })
    bio: string | null = null;

}
