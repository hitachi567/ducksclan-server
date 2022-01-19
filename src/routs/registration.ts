import BodyValidationService from '../services/body.validation';
import RegistrationService from '../services/registration';
import { Middleware } from '@hitachi567/core';
import {
    Registration,
    EmailBody,
    AuthorizedLocalsWithUser,
    LocalsWithUser
} from '../interfaces';
import {
    authenticate,
    handleValidateResult,
    setUser,
    confirmEmail,
    tokenIssuance,
    sendSucces
} from '../middlewares';

function changeEmail(): Middleware<EmailBody, AuthorizedLocalsWithUser> {
    return setUser(
        (body, locals) => manager =>
            new RegistrationService(manager).changeEmail(body, locals)
    );
}

function registerEmail(): Middleware<EmailBody, LocalsWithUser> {
    return setUser(
        body => manager =>
            new RegistrationService(manager).registerEmail(body)
    );
}

export const registration: Registration = {
    registerEmail: [
        ...BodyValidationService.EmailBody(),
        handleValidateResult(),
        registerEmail(),
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
        sendSucces()
    ]
}
