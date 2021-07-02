import { Database as Driver, Statement } from 'sqlite3';
import { Database } from 'sqlite';
import Joi from 'joi';

export type TUser = {
    user_id: string, // unchangeable unique
    registeredAt: TDatestamp, // unchangeable
    activate: {
        status: boolean,
        date: TDatestamp | null
    }
    disabled: {
        status: boolean,
        reason: string | null,
        date: TDatestamp | null
    },
    accessRight: number,
    username: string, // unique
    email: string, // unique
    password: string,
    name: string,
    surname: string | null,
    position: string | null,
    about: string | null,
    online: {
        status: boolean,
        date: TDatestamp
    },
    picSrc: string | null
}

export type TDBUser = {
    user_id: string, // unchangeable unique
    registeredAt: string, // unchangeable
    activate_status: string,
    activate_date: string | null
    disabled_status: string,
    disabled_reason: string | null,
    disabled_date: string | null,
    accessRight: number,
    username: string, // unique
    email: string, // unique
    password: string,
    name: string,
    surname: string | null,
    position: string | null,
    about: string | null,
    online_status: string,
    online_date: string,
    picSrc: string | null
}

export type TDBUserPublic = {
    user_id: string, // unchangeable unique
    name: string,
    surname?: string | null,
    position?: string | null,
    about?: string | null,
    online_status: string,
    online_date: string,
    picSrc?: string | null
}

export type TDBUserPrivate = {
    user_id: string, // unchangeable unique
    registeredAt: string, // unchangeable
    activate_status: string,
    activate_date?: string | null
    disabled_status: string,
    disabled_reason?: string | null,
    disabled_date?: string | null,
    accessRight: number,
    password: string,
}

export type TDBUserUnique = {
    user_id: string, // unchangeable unique
    username: string, // unique
    email: string, // unique
}




export type TUser_unique = {
    user_id: string, // unchangeable unique
    username: string, // unique
    email: string, // unique

}


export type TTestingUser = {
    user_id: string,
    name: string,
    username: string,
    email: string,
    password: string
};

export type TSignUp = {
    user_id: string,
    username: string,
    email: string,
    password: string,
    name: string,
    activateLink: string
};

type TDatestamp = string;

export type SqliteDB = Database<Driver, Statement>;