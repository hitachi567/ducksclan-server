import BodyValidationService from '../services/body.validation';
import CredentialService from '../services/credential';
import { Middleware } from '@hitachi567/core';
import {
    handleValidateResult,
    authenticate,
    setUser,
    sendSucces
} from '../middlewares';
import {
    Credential,
    UsernameBody,
    PasswordBody,
    ChangePasswordBody,
    AuthorizedLocalsWithUser
} from '../interfaces';

function registerUsername(): Middleware<UsernameBody, AuthorizedLocalsWithUser> {
    return setUser((body, locals) => manager =>
        new CredentialService(manager).registerUsername(body, locals)
    );
}

function changeUsername(): Middleware<UsernameBody, AuthorizedLocalsWithUser> {
    return setUser((body, locals) => manager =>
        new CredentialService(manager).changeUsername(body, locals)
    );
}

function registerPassword(): Middleware<PasswordBody, AuthorizedLocalsWithUser> {
    return setUser((body, locals) => manager =>
        new CredentialService(manager).registerPassword(body, locals)
    );
}

function changePassword(): Middleware<ChangePasswordBody, AuthorizedLocalsWithUser> {
    return setUser((body, locals) => manager =>
        new CredentialService(manager).changePassword(body, locals)
    );
}

export const credential: Credential = {
    registerUsername: [
        ...BodyValidationService.UsernameBody(),
        handleValidateResult(),
        authenticate(),
        registerUsername(),
        sendSucces()
    ],
    registerPassword: [
        ...BodyValidationService.PasswordBody(),
        handleValidateResult(),
        authenticate(),
        registerPassword(),
        sendSucces()
    ],
    changeUsername: [
        ...BodyValidationService.UsernameBody(),
        handleValidateResult(),
        authenticate(),
        changeUsername(),
        sendSucces()
    ],
    changePassword: [
        ...BodyValidationService.ChangePasswordBody(),
        handleValidateResult(),
        authenticate(),
        changePassword(),
        sendSucces()
    ]
}
