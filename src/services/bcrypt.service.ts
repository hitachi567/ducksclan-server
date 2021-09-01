import bcrypt from 'bcrypt';

export default class BcryptService {

    hashingPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    checkPassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

}