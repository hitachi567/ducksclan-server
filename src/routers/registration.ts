import { authenticate, tokenIssuance, sendSucces, handleValidateResult } from '../middlewares';
import { EmailBody, AuthorizedLocals, LocalsWithUser } from '../interfaces';
import { asyncMiddleware, Middleware } from '@hitachi567/core';
import { Router } from 'express';
import BodyValidationService from '../services/body.validation';
import RegistrationService from '../services/registration';
import Database from '../database/index';
import User from '../entities/user';

function changeEmail(): Middleware<EmailBody, AuthorizedLocals & LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            RegistrationService.changeEmail(request.body, response.locals)
        );

        response.locals.user = user;

        next();

    });
}

function registerEmail(): Middleware<EmailBody, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            RegistrationService.registerEmail(request.body)
        );

        response.locals.user = user;

        next();

    });
}

function confirmEmail(): Middleware<EmailBody, LocalsWithUser> {
    return asyncMiddleware(async (request, response, next) => {

        let user = await Database.transaction<User>(
            RegistrationService.confirmEmail(request.params.link)
        );

        response.locals.user = user;

        next();

    });
}

export const EmailRegistrationRouter = Router()
    .post('/register',
        BodyValidationService.EmailBody(),
        handleValidateResult(),
        registerEmail(),
        tokenIssuance()
    )
    .post('/change',
        BodyValidationService.EmailBody(),
        handleValidateResult(),
        authenticate(),
        changeEmail(),
        tokenIssuance()
    )
    .get('/confirm/:link',
        confirmEmail(),
        sendSucces()
    );
