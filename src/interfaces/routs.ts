import { Middleware } from '@hitachi567/core';
import { EmailBody, UsernameBody, PasswordBody, ChangePasswordBody } from './body';
import { LocalsWithUser, AuthorizedLocals, AuthorizedLocalsWithUser } from './locals';

export interface Registration extends Record<string, Middleware<any, any>[]> {
    registerEmail: Middleware<EmailBody, LocalsWithUser>[];
    changeEmail: Middleware<EmailBody, AuthorizedLocals & LocalsWithUser>[];
    confirmEmail: Middleware<{}, LocalsWithUser>[];
}

export interface Credential extends Record<string, Middleware<any, any>[]> {
    registerUsername: Middleware<UsernameBody, AuthorizedLocalsWithUser>[];
    registerPassword: Middleware<PasswordBody, AuthorizedLocalsWithUser>[];
    changeUsername: Middleware<UsernameBody, AuthorizedLocalsWithUser>[];
    changePassword: Middleware<ChangePasswordBody, AuthorizedLocalsWithUser>[];
}
