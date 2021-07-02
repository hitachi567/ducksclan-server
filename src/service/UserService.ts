import UserDB from "../database/UserDB";
import CustomError from "../utils/CustomError";

export default class UserService {
    private db = new UserDB();

    async info(user_id: string) {
        try {
            await this.db.connect();
            return await this.db.get().user(user_id);
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            await this.db.disconnect()
        }
    }

    async posts(user_id: string) {
        try {
            await this.db.connect();
            return await this.db.get().userPost(user_id);
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            await this.db.disconnect()
        }
    }

    async addPost(user_id: string, text: string) {
        try {
            await this.db.connect();
            return await this.db.addPost(user_id, text);
        } catch (error) {
            throw CustomError.handleServerError(error);
        } finally {
            await this.db.disconnect()
        }
    }
}