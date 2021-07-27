import bcrypt from 'bcrypt';

export default class BcryptService {

    async hashingPassword(password: string) {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            return undefined;
        }
    }

    async checkPassword(password: string, hashedPassword: string) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            return undefined;
        }
    }

}