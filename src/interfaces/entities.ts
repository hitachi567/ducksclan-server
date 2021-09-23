
export interface EntitieUser {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
    isDisabled?: boolean;
    online?: boolean;
    online_date?: Date;
    activate_date?: Date;
    avatar?: number;
}

export interface EntitieUserPhoto {
    url: string;
    user_id: string;
    number: number;
    created_at?: Date;
}

export interface EntitieActivateLink {
    user_id: string;
    link: string;
    created_at?: Date;
}

export interface EntitieToken {
    token: string;
    fingerprint: string;
    user_id: string;
    ip?: string;
    created_at?: Date;
}

export interface EntitieDisabledUser {
    user_id: string;
    by: string;
    reason: number;
    start_date?: Date;
    end_date?: Date;
}

export interface EntitieJournal {
    id?: number;
    fingerprint?: string;
    ip?: string;
    user_id?: string;
    action: string;
    success: boolean;
    note?: string;
    created_at?: Date;
}
