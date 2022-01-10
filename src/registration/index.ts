import { Timeout } from '@hitachi567/core';
import { Router } from 'express';
import BodyValidationService from '../services/body.validation';
import authenticate from '../middleware/authenticate';
import registerEmail from './register-email';
import changeEmail from './change-email';
import confirmEmail from './confirm-email';

export const rejectRegistrationTimout = new Timeout();

export const EmailRegistrationRouter = Router()
    .post('/register',
        BodyValidationService.EmailBody(),
        registerEmail()
    )
    .post('/change',
        BodyValidationService.EmailBody(),
        authenticate(),
        changeEmail()
    )
    .get('/confirm/:link',
        confirmEmail()
    );
