import { v4 } from 'uuid';
import CustomError from '../utils/CustomError';
import Log from '../utils/Log';
import Database from './Database';

export default class UserDB extends Database {
    get() {
        return {
            ...super.get(),
            user: (user_id: string) => this.getUser(user_id),
            userPost: (user_id: string) => this.addNewPost(user_id)
        }
    }

    private async getUser(user_id: string) {
        Log.info('getting user from database');
        const query1 = 'SELECT name FROM users WHERE user_id = ?;';
        const query2 = 'SELECT username FROM users_unique WHERE user_id = ?;';
        try {
            const name = await this.db.get<{ name: string }>(query1, user_id);
            const username = await this.db.get<{ username: string }>(query2, user_id);
            if (username && name) {
                return { username: username.username, name: name.name };
            } else {
                return {
                    username: '@UNKNOWN',
                    name: '@UNKNOWN'
                }
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async addNewPost(user_id: string) {
        Log.info('getting user posts from database');
        const query = 'SELECT post_id, text, date FROM posts WHERE user_id = ? ORDER BY date;';
        try {
            const posts = await this.db.all<{
                post_id: string,
                text: string,
                date: string,
            }[]>(query, user_id);
            return posts;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async addPost(user_id: string, text: string) {
        Log.info('add new posts to database');
        const query = 'INSERT INTO posts(post_id, user_id, text) VALUES (?, ?, ?)';
        try {
            const result = await this.db.run(query, v4(), user_id, text);
            if (!(result.changes || 0 > 0)) {
                throw new CustomError('database error', 'can\'t add post');
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }
}