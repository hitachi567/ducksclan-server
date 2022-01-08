
export interface OnlineStatus {
    isOnline: boolean;
    online_updated_at: Date;
}

export interface BanStatus {
    isBanned: boolean;
    banned_at?: Date;
}

export interface EmailConfirmStatus {
    isConfirmed: boolean;
    confirmed_at?: Date;
}

export interface UserMetadata extends OnlineStatus, BanStatus, EmailConfirmStatus { }

export interface UserInfo {
    id: string;
    email: string;
    username: string;
    password?: string;
    confirm_link?: string;
}

export interface UserProfile {
    name?: string;
    bio?: string;
}

export interface UserInterface extends UserInfo, UserProfile, UserMetadata { }

export interface UserProfileJSON extends UserProfile {
    username: string;
    online: OnlineStatus;
}

export interface UserJSON {
    info: UserInfo;
    profile: UserProfile;
    onlineStatus: OnlineStatus;
    banStatus: BanStatus;
    confirmStatus: EmailConfirmStatus;
}
