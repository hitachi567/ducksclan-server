import User from '../entities/user';

export interface TokenPayloadInterface {
    fingerprint: string;
    user_id: string;
    ip?: string | null;
}

export interface RefreshTokenInterface {
    user: User;
    token: string;
    fingerprint: string;
    ip?: string | null;
}

export interface RefreshTokenJSON {
    token: string;
    payload: TokenPayloadInterface;
}
