
export interface TokenPayloadInterface {
    fingerprint: string;
    user_id: string;
    ip?: string | null;
}

export interface RefreshTokenJSON {
    token: string;
    payload: TokenPayloadInterface;
}
