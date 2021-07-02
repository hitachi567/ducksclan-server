import Database from './Database';
import { getTestingUsers } from './createTables';
import { TSignUp } from '../utils/types';
import CustomError from '../utils/CustomError';
import Log from '../utils/Log';

export default class AuthDB extends Database {

    get() {
        return {
            ...super.get(),
            hashedPassword: (user_id: string) => this.getPassword(user_id),
            refreshToken: this.getRefreshToken
        }
    }

    async signUp(params: TSignUp) {
        Log.info('adding user to database');
        try {
            const result1 = this.addUserToUser_unique(
                params.user_id,
                params.username,
                params.email
            );
            const result2 = this.addUserToUser_private(
                params.user_id,
                params.activateLink,
                params.password
            );
            const result3 = this.addUserToUsers(
                params.user_id,
                params.name,
            );
            const res = await Promise.all([result1, result2, result3]);
            for (const iterator of res) {
                if (!iterator) {
                    throw new CustomError('database error', 'error adding user [' + params.user_id + ']');
                }
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async addUserToUsers(user_id: string, name: string) {
        const query = 'INSERT INTO users (user_id, name) VALUES (?, ?);';
        try {
            const result = await this.db.run(query, [user_id, name]);
            if (result.changes || 0 > 0) {
                return 1;
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async addUserToUser_private(user_id: string, activateLink: string, hashedPassword: string) {
        const query = 'INSERT INTO users_private (user_id, activate_link, password) VALUES (?, ?, ?);';
        try {
            const result = await this.db.run(query, [user_id, activateLink, hashedPassword]);
            if (result.changes || 0 > 0) {
                return 1;
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async addUserToUser_unique(user_id: string, username: string, email: string) {
        const query = 'INSERT INTO users_unique (user_id, username, email) VALUES (?, ?, ?);';
        try {
            const result = await this.db.run(query, [user_id, username, email]);
            if (result.changes || 0 > 0) {
                return 1;
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async saveRefreshToken(user_id: string, refreshToken: string) {
        Log.info('saving refresh token to database');
        try {
            const user = await this.getRefreshToken(user_id);
            if (user) {
                const query = 'UPDATE tokens SET refreshToken = ? WHERE user_id = ?;';
                const result = await this.db.run(query, refreshToken, user_id);
                if (!(result.changes || 0 > 0)) {
                    throw new CustomError('database error', 'can\'t save refresh tokens');
                }
            } else {
                const query = 'INSERT INTO tokens (refreshToken, user_id) VALUES (?, ?);';
                const result = await this.db.run(query, refreshToken, user_id);
                if (!(result.changes || 0 > 0)) {
                    throw new CustomError('database error', 'can\'t save refresh tokens');
                }
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async removeRefreshToken(user_id: string) {
        Log.info('removing refresh token from database');
        const query = 'DELETE FROM tokens WHERE user_id = ?;';
        try {
            const user = await this.getRefreshToken(user_id);
            if (user) {
                const result = await this.db.run(query, user_id);
                if (!(result.changes || 0 > 0)) {
                    throw new CustomError('database error', 'can\'t delete refresh tokens');
                }
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async getRefreshToken(user_id: string) {
        const query = 'SELECT * FROM tokens WHERE user_id = ?;';
        try {
            const user = await this.db.get<{ user_id: string, refreshToken: string }>(query, user_id);
            if (user) {
                return user.refreshToken;
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async addTestingUsers(count: number = 10) {
        try {
            const users = getTestingUsers(count > 1000 ? 1000 : count);
            for (const user of users) {
                const options: TSignUp = {
                    ...user,
                    activateLink: ''
                }
                Log.info('adding user: %O', user);
                await this.signUp(options);
            }
            Log.info('these users are added:');
            console.table(users);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private async getPassword(user_id: string) {
        Log.info('getting password from database');
        const query = 'SELECT password FROM users_private WHERE user_id = ?;';
        try {
            const result = await this.db.get<{ password: string }>(query, user_id);
            if (result) {
                return result.password;
            } else {
                throw new CustomError('logic error', 'password not found');
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }
}
