import BodyValidationService from '../services/body.validation';
import RegistrationService from '../services/registration';
import { Middleware } from '@hitachi567/core';
import {
    Registration,
    EmailBody,
    AuthorizedLocals
} from '../interfaces';
import {
    authenticate,
    handleValidateResult,
    setUser,
    confirmEmail,
    tokenIssuance,
    sendSucces
} from '../middlewares';
import ChangeEmailService from '../services/changeEmail';

function changeEmail(): Middleware<EmailBody, AuthorizedLocals> {
    return setUser(
        (body, locals) => manager =>
            new ChangeEmailService(locals.user, manager).changeEmail(body)
    );
}

function registerEmail(): Middleware<EmailBody, AuthorizedLocals> {
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
