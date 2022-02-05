import { handleValidateResult, authenticate, sendSucces, tokenIssuance } from '../middlewares';
import { Credential } from '../interfaces';
import BodyValidationService from '../services/body.validation';
import setUsername from './set.username';
import setPassword from './set.password';
import changePassword from './change.password';

export const credential: Credential = {
    setUsername: [
        ...BodyValidationService.UsernameBody(),
        handleValidateResult(),
        authenticate(),
        setUsername(),
        sendSucces()
    ],
    setPassword: [
        ...BodyValidationService.PasswordBody(),
        handleValidateResult(),
        authenticate(),
        setPassword(),
        tokenIssuance()
    ],
    changePassword: [
        ...BodyValidationService.ChangePasswordBody(),
        handleValidateResult(),
        authenticate(),
        changePassword(),
        tokenIssuance()
    ]
}
