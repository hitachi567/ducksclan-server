
export interface RefreshTokenInterface {
    fingerprint: string;
    token: string;
    user_id: string;
    ip?: string | null;
}

export interface TokenPayloadInterface {
    fingerprint: string;
    user_id: string;
    ip?: string | null;
}

export interface RefreshTokenJSON {
    refresh: string;
    payload: TokenPayloadInterface;
}
