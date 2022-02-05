import { LocalsWithCookies, TaggedLoclas } from '@hitachi567/core';
import User from '../entities/user';

export interface AppLocals extends LocalsWithCookies, TaggedLoclas { }

export interface LocalsWithUser extends AppLocals {
    user: User;
}

export interface AuthorizedLocals extends LocalsWithUser {
    user_id: string;
}
