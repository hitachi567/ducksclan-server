import { RefreshTokenInterface, RefreshTokenJSON } from '../interfaces/token.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import BaseEntity from '../database/a.base.entity';

@Entity()
export default class RefreshToken extends BaseEntity implements RefreshTokenInterface {

    constructor(fingerprint: string, token: string, user_id: string) {
        super();
        this.fingerprint = fingerprint;
        this.token = token;
        this.user_id = user_id;
    }

    static init(data: RefreshTokenInterface) {

        let entity = new RefreshToken(data.fingerprint, data.token, data.user_id);

        if (data.ip) {
            entity.ip = data.ip;
        }

        return entity;

    }

    toJSON(): RefreshTokenJSON {
        return {
            refresh: this.token,
            payload: {
                fingerprint: this.fingerprint,
                user_id: this.user_id,
                ip: this.ip
            }
        }
    }

    @PrimaryColumn({ unique: true })
    fingerprint: string;

    @Column({ unique: true })
    token: string;

    @Column()
    user_id: string;

    @Column({ nullable: true })
    ip?: string | null = null;

}
