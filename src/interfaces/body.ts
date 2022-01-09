
export interface EmailBody {
    email: string;
}

export interface UsernameBody {
    username: string;
}

export interface PasswordBody {
    password: string;
}

export interface LoginBody extends UsernameBody, PasswordBody { }
