import bcrypt from 'bcrypt';
import Joi from 'joi';
import { v4 } from 'uuid';
import AuthDB from '../database/AuthDB';
import CustomError from '../utils/CustomError';
import { TSignUp } from '../utils/types';
import MailService from './MailService';
import TokenService from './TokenService';


export default class AuthService {
    private db = new AuthDB();

    async signUp(params: {
        email: string,
        username: string,
        password: string,
        name: string
    }) {
        try {
            await this.db.connect();
            await this.checkCandidate(params.email, params.username);
            const password = await this.hashingPassword(params.password)
            const userData = this.signUpData({ ...params, password });
            const tokens = new TokenService().generateTokens({ user_id: userData.user_id });

            await this.db.signUp(userData);
            await this.db.saveRefreshToken(userData.user_id, tokens.refreshToken);
            await new MailService().sendActivationMail(params.email, userData.activateLink);
            return { user_id: userData.user_id, tokens }
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            this.db.disconnect();
        }
    }

    async signIn(unique: string, password: string) {
        try {
            await this.db.connect();
            const user_id = await this.getUserID(unique);
            if (!user_id) {
                throw CustomError.BadRequest('user not found');
            }
            const hashedPassword = await this.db.get().hashedPassword(user_id);
            const result = await this.checkPassword(password, hashedPassword);
            if (result) {
                const tokens = new TokenService().generateTokens({ user_id });
                await this.db.saveRefreshToken(user_id, tokens.refreshToken);
                return { user_id, tokens }
            } else {
                throw CustomError.BadRequest('wrong password');
            }
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            this.db.disconnect();
        }
    }

    async signOut(refreshToken: string) {
        try {
            const user_id = new TokenService().getUserID(refreshToken);
            if (!user_id) {
                throw CustomError.BadRequest('invalid token')
            }
            await this.db.connect();
            await this.db.removeRefreshToken(user_id);
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            this.db.disconnect();
        }
    }

    async refresh(refreshToken: string) {
        try {
            const service = new TokenService()
            const user_id = service.validateRefreshToken(refreshToken);
            if (!user_id) {
                throw CustomError.BadRequest('invalid token');
            }
            await this.db.connect();
            const oldRefreshToken = await this.db.get().refreshToken(user_id);
            if (!oldRefreshToken) {
                throw CustomError.Unauthorized('invalid token');
            }
            const tokens = service.generateTokens({ user_id });            
            await this.db.saveRefreshToken(user_id, tokens.refreshToken);
            return { user_id, tokens }
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            this.db.disconnect();
        }
    }

    private async getUserID(unique: string) {
        const { error: isUsername } = Joi.string().email().validate(unique);
        try {            
            if (isUsername) {
                return await this.db.get().user_id.byUsername(unique);
            } else {
                return await this.db.get().user_id.byEmail(unique);
            }
        } catch (error) {
            throw CustomError.handleServerError(error);
        }
    }

    private async checkCandidate(email: string, username: string) {
        try {
            const checkEmail = await this.db.get().user_id.byEmail(email);
            const checkUsername = await this.db.get().user_id.byUsername(username);
            if (checkEmail) {
                throw CustomError.BadRequest('user with the same email already exists');
            }
            if (checkUsername) {
                throw CustomError.BadRequest('user with the same username already exists');
            }
        } catch (error) {
            throw CustomError.handleServerError(error);
        }
    }

    private async hashingPassword(password: string) {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            throw CustomError.handleServerError(error);
        }
    }

    private signUpData(params: {
        username: string;
        email: string;
        password: string;
        name: string;
    }): TSignUp {
        return {
            ...params,
            user_id: 'user-' + v4(),
            activateLink: v4()
        }
    }

    private async checkPassword(password: string, hashedPassword: string) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw CustomError.handleServerError(error);
        }
    }
}
