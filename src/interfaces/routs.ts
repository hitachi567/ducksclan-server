import { Middleware } from '@hitachi567/core';
import { AuthorizedLocals, LocalsWithUser } from './locals';
import {
    EmailBody,
    UsernameBody,
    PasswordBody,
    ChangePasswordBody
} from './body';

export interface Registration extends Record<string, Middleware<any, any>[]> {
    register: Middleware<EmailBody, LocalsWithUser>[];
    changeEmail: Middleware<EmailBody, AuthorizedLocals>[];
    confirmEmail: Middleware<{}, LocalsWithUser>[];
}

export interface Credential extends Record<string, Middleware<any, any>[]> {
    setUsername: Middleware<UsernameBody, AuthorizedLocals>[];
    setPassword: Middleware<PasswordBody, AuthorizedLocals>[];
    changePassword: Middleware<ChangePasswordBody, AuthorizedLocals>[];
}
