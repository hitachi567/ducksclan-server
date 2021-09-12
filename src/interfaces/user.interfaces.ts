
export interface IUserCreate {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface IUserOnlineGet {
    user_id: string;
    status: number;
    date: string;
}
