import { Registration } from '../interfaces/routs';
import { handleValidateResult } from '../middlewares/handle-validate-result';
import { authenticate } from '../middlewares/authenticate';
import { tokenIssuance } from '../middlewares/token-issuance';
import BodyValidationService from '../services/body.validation';
import register from './register';
import changeEmail from './changeEmail';
import confirmEmail from './confirmEmail';

export const registration: Registration = {
    register: [
        ...BodyValidationService.EmailBody(),
        handleValidateResult(),
        register(),
        tokenIssuance()
    ],
    changeEmail: [
        ...BodyValidationService.EmailBody(),
        handleValidateResult(),
        authenticate(),
        changeEmail(),
        tokenIssuance()
    ],
    confirmEmail: [
        confirmEmail(),
        tokenIssuance()
    ]
}
