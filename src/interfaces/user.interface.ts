import { User } from '../entities';
import { BaseEntityInteraface, SerialEntityInteraface } from './entity.intrafaces';

export interface IUser extends BaseEntityInteraface {
    email: string;
    username: string | null;
    password: string | null;
    banned_at: Date | null;
    confirmed_at: Date | null;
}

export interface IUserProfile extends BaseEntityInteraface {
    first_name: string | null;
    second_name: string | null;
    bio: string | null;
    department: string | null;
    position: string | null;
}

export interface IUserOnline extends BaseEntityInteraface {
    is_online: boolean;
    updated_at: Date;
}

export interface IConfirmLink {
    payload: string;
}

export interface IRefreshToken {
    user: User;
    token: string;
    fingerprint: string;
    ip?: string | null;
}
