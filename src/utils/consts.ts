import path from 'path';
import { Database } from 'sqlite3';

export const APPDATA = process.env.APPDATA || (
    process.platform === 'darwin' ?
        process.env.HOME + '/Library/Preferences' :
        process.env.HOME + "/.local/share"
);
export const APP_PATH = path.resolve(APPDATA, 'chat');
export const DB_PATH = path.resolve(APP_PATH, 'db.db');
export const DB_OPTIONS = { filename: DB_PATH, driver: Database }
export const CONFIG_PATH = path.resolve(APP_PATH, 'config.json');
export const AUTH_ROUTS = {
    signUp: '/up',
    signIn: '/in',
    signOut: '/out',
    activate: '/activate/:link',
    refresh: '/refresh'
}
export const PROFILE_ROUTS = {
    info: '/info',
    posts: '/posts',
    addPost: '/add-post'
}