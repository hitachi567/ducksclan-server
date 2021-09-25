import { IRegistrationArguments } from '../interfaces/auth';
import ApiError from '../lib/ApiError';
import BcryptService from '../services/bcrypt.service';
import Generator from '../lib/Generator';
import MailService from '../services/mail.service';
import TokenService from '../services/token.service';
import UserService from '../services/user.service';

export default class RegistrationService {
    static timeouts = new Map<string, NodeJS.Timeout>();

    static async registration(data: IRegistrationArguments) {
        const { username, email, fingerprint, ip } = data
        await UserService.checkingUniquenessUsernameAndEmail(username, email);

        const password = await BcryptService.hashingPassword(data.password);
        const user = await UserService.create({ username, email, password });
        const tokens = await TokenService.generateAndSave({ user_id: user.id, fingerprint, ip });
        const link = 'http://auth.api.ducksclan.ru/activate/' + Generator.generateSequense(50);
        const day = 24 * 60 * 60 * 1000;

        await new MailService().sendConfirmMessage(email, username, link);
        this.timeouts.set(user.id, setTimeout(cb, 7 * day));

        return tokens;

        async function cb() {
            await UserService.rejectActivation(user.id)
        }
    }

    confirm(code: string) {
        return ApiError.BadRequest();
    }
}