import bcrypt from 'bcrypt';

export default class BcryptService {

    static hashingPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    static checkPassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

}