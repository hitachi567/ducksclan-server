import { randomBytes, randomInt, randomUUID } from 'crypto';

export default class Generator {

    static generateUserID() {
        return randomUUID();
    }

    static generateSequense(size: number) {
        return randomBytes(size).toString('hex');
    }

    static generateInt(min: number, max: number) {
        return randomInt(min, max);
    }

}