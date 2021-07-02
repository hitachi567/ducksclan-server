import { v4 } from "uuid";
import { TDBUserPrivate, TDBUserPublic, TDBUserUnique, TTestingUser } from "../utils/types";

export const sqlTables = [`
create table if not exists "users" (
    "user_id" text not null unique,
    "name" text not null,
    "surname" text,
    "position" text,
    "about" text,
    "online_status" text not null default 'false',
    "online_date" datetime not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    "picSrc" text,
    primary key("user_id")
);
`, `
create table if not exists "users_unique" (
    "user_id" text not null unique,
    "username" text not null unique,
    "email" text not null unique,
    primary key("user_id")
);
`, ` 
create table if not exists "users_private" (
    "user_id" text not null unique,
    "registeredAt" datetime not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    "activate_status" text not null default 'false',
    "activate_link" text not null,
    "activate_date" datetime,
    "disabled_status" text not null default 'false',
    "disabled_reason" text,
    "disabled_date" datetime,
    "accessRight" number not null default 0,
    "password" text not null,
    primary key("user_id")
);
`, `
create table if not exists "tokens" (
    "user_id" text not null,
    "refreshToken" text not null
);
`, `
create table if not exists "posts" (
    "post_id" text not null unique,
    "user_id" text not null,
    "text" text not null,
    "date" datetime not null default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    primary key("post_id")
);
`, `
create table if not exists "chats" (
    "_id" text not null unique,
    "isPrivateMessages" text,
    "name" text,
    "picSrc" text,
    "lastChange" text,
    primary key("_id")
);
`];

export function getTestingUsers(count: number): TTestingUser[] {
    const result: TTestingUser[] = [];

    for (let i = 0; i < count; i++) {
        const id = 'user-' + v4()//.replace(/-/g, '');
        let user: TTestingUser = {
            user_id: id,
            name: 'user_' + i,
            username: id.substring(0, 13) + '_' + i,
            email: id.substring(0, 13) + '@fakemail.io',
            password: 'password'
        }

        result.push(user);
    }

    return result;
}

