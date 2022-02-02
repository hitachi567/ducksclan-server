import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RefreshTokenJSON, TokenPayloadInterface } from '../interfaces';
import { IRefreshToken } from '../interfaces/user.interface';
import BaseEntity from '../database/a.base.entity';
import User from './user';

@Entity()
export default class TokenRefresh extends BaseEntity implements IRefreshToken {

    @PrimaryColumn({ unique: true })
    fingerprint: string;

    @Column({ unique: true })
    token: string;

    @Column({ type: 'varchar', nullable: true })
    ip?: string | null = null;

    @ManyToOne(() => User, user => user.tokens, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    constructor(fingerprint: string, token: string, user: User) {
        super();
        this.fingerprint = fingerprint;
        this.token = token;
        this.user = user;
    }

    static init(data: IRefreshToken) {

        let entity = new TokenRefresh(data.fingerprint, data.token, data.user);
        entity.ip = data.ip;

        return entity;

    }

    toJSON(): RefreshTokenJSON {
        return {
            token: this.token,
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

}
