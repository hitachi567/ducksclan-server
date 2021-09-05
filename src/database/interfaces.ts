
export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    create_date: Date;
}

export interface IUserOnline {
    user_id: string;
    status: boolean;
    date: Date;
}

export interface IUserPhoto {
    id: string;
    user_id: string;
    number: number;
    url: string;
    date: Date;
}

export interface IToken {
    id: string;
    user_id: string;
    fingerprint: string;
    ip?: string;
    token: string;
    date: Date;
}

export interface IActrivateCode {
    user_id: string;
    code: number;
    date: Date;
}

export interface IJournal {
    id: number;
    fingerprint?: string;
    ip?: string;
    user_id?: string;
    action?: string;
}

export interface IDisabledUser {
    user_id: string;
    reason?: number;
    date: Date;
    by: string;
}
