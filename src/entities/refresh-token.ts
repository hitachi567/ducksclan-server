import { RefreshTokenInterface, RefreshTokenJSON, TokenPayloadInterface } from '../interfaces';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import BaseEntity from '../database/a.base.entity';
import User from './user';

@Entity()
export default class RefreshToken extends BaseEntity implements RefreshTokenInterface {

    constructor(fingerprint: string, token: string, user: User) {
        super();
        this.fingerprint = fingerprint;
        this.token = token;
        this.user = user;
    }

    static init(data: RefreshTokenInterface) {

        let entity = new RefreshToken(data.fingerprint, data.token, data.user);

        if (data.ip) {
            entity.ip = data.ip;
        }

        return entity;

    }

    toJSON(): RefreshTokenJSON {
        return {
            refresh: this.token,
            payload: this.getPayload()
        }
    }

    getPayload(): TokenPayloadInterface {
        let user_id = this.user?.id || 'UNKNOW';
        return {
            fingerprint: this.fingerprint,
            user_id: user_id,
            ip: this.ip
        }
    }

    @PrimaryColumn({ unique: true })
    fingerprint: string;

    @Column({ unique: true })
    token: string;

    @Column({ nullable: true })
    ip?: string;

    // @Column()
    // user_id: string;

    @ManyToOne(() => User, user => user.tokens, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

}
