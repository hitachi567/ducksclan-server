import { User } from '../entities';

export interface BaseEntityInteraface {
    created_at: Date;
    updated_at: Date;
}

export interface SerialEntityInteraface extends BaseEntityInteraface {
    id: number;
}

export interface UUIDEntityInteraface extends BaseEntityInteraface {
    id: string;
}

export interface IUser extends BaseEntityInteraface {
    email: string;
    username: string | null;
    password: string | null;
    banned_at: Date | null;
    confirmed_at: Date | null;
}

export interface IUserProfile extends SerialEntityInteraface {
    user: User;
    first_name: string | null;
    second_name: string | null;
    bio: string | null;
    department: string | null;
    position: string | null;
}

export interface IUserOnline extends SerialEntityInteraface {
    user: User;
    is_online: boolean;
    updated_at: Date;
}

export interface IConfirmLink {
    user: User;
    payload: string;
}

export interface IRefreshToken {
    user: User;
    token: string;
    fingerprint: string;
    ip?: string | null;
}
