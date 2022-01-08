import User from '../entities/user';

export interface TokenPayloadInterface {
    fingerprint: string;
    user_id: string;
    ip?: string;
}

export interface RefreshTokenInterface {
    user: User;
    token: string;
    fingerprint: string;
    ip?: string;
}

export interface RefreshTokenJSON {
    refresh: string;
    payload: TokenPayloadInterface;
}
