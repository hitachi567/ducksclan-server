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
    return setUser(CredentialService.registerUsername);
}

function changeUsername(): Middleware<UsernameBody, AuthorizedLocalsWithUser> {
    return setUser(CredentialService.changeUsername);
}

function registerPassword(): Middleware<PasswordBody, AuthorizedLocalsWithUser> {
    return setUser(CredentialService.registerPassword);
}

function changePassword(): Middleware<ChangePasswordBody, AuthorizedLocalsWithUser> {
    return setUser(CredentialService.changePassword);
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
