import { LocalsWithCookies, TaggedLoclas } from '@hitachi567/core';
import User from '../entities/user';

export interface AppLocals extends LocalsWithCookies, TaggedLoclas { }

export interface LocalsWithUser extends AppLocals {
    user: User
}

export interface AuthorizedLocals extends AppLocals {
    user: User;
    user_id: string;
}

export type AuthorizedLocalsWithUser = AuthorizedLocals & LocalsWithUser;
