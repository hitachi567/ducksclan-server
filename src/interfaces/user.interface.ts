
export interface OnlineStatus {
    isOnline: boolean;
    online_updated_at: Date;
}

export interface BanStatus {
    isBanned: boolean;
    banned_at: Date | null;
}

export interface EmailConfirmStatus {
    isConfirmed: boolean;
    confirmed_at: Date | null;
}

export interface UserMetadata extends OnlineStatus, BanStatus, EmailConfirmStatus { }

export interface UserInfo {
    id: string;
    email: string;
    username: string;
    password: string | null;
    confirm_link: string | null;
}

export interface UserProfile {
    name: string | null;
    bio: string | null;
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
