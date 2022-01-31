import { Middleware } from '@hitachi567/core';
import { EmailBody, UsernameBody, PasswordBody, ChangePasswordBody } from './body';
import { AuthorizedLocals } from './locals';

export interface Registration extends Record<string, Middleware<any, any>[]> {
    registerEmail: Middleware<EmailBody, AuthorizedLocals>[];
    changeEmail: Middleware<EmailBody, AuthorizedLocals>[];
    confirmEmail: Middleware<{}, AuthorizedLocals>[];
}

export interface Credential extends Record<string, Middleware<any, any>[]> {
    registerUsername: Middleware<UsernameBody, AuthorizedLocals>[];
    registerPassword: Middleware<PasswordBody, AuthorizedLocals>[];
    changeUsername: Middleware<UsernameBody, AuthorizedLocals>[];
    changePassword: Middleware<ChangePasswordBody, AuthorizedLocals>[];
}
