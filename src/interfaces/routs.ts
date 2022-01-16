import { Middleware } from '@hitachi567/core';
import { EmailBody } from './body';
import { LocalsWithUser, AuthorizedLocals } from './locals';

export interface Registration extends Record<string, Middleware<any, any>[]> {
    registerEmail: Middleware<EmailBody, LocalsWithUser>[],
    changeEmail: Middleware<EmailBody, AuthorizedLocals & LocalsWithUser>[],
    confirmEmail: Middleware<{}, LocalsWithUser>[],
}
