import { v4 } from 'uuid';
import BcryptService from './bcrypt.service';


export default class RegistrationService {
    check(username: string, email: string) {
        this.checkUniquenessUserData(username, email);

    }

    registration(username: string, email: string, password: string, firstname: string) {
        this.checkUniquenessUserData(username, email);

        
        const hashedPassword = new BcryptService().hashingPassword(password);
        const user_id = 'user-' + v4();
        // const code = 
    }

    confirm(code: string) {

    }

    private checkUniquenessUserData(username: string, email: string) {
        // db.findOne()
    }
}