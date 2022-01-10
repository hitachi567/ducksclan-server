import { Router } from 'express';
import BodyValidationService from '../services/body.validation';
import authenticate from '../middleware/authenticate';
import registerEmail from '../auth/registration/register-email';
import changeEmail from '../auth/registration/change-email';
import confirmEmail from '../auth/registration/confirm-email';
import tokenIssuance from '../auth/token-issuance';
import sendSucces from '../middleware/send-success';

export const EmailRegistrationRouter = Router()
    .post('/register',
        BodyValidationService.EmailBody(),
        registerEmail(),
        tokenIssuance()
    )
    .post('/change',
        BodyValidationService.EmailBody(),
        authenticate(),
        changeEmail(),
        tokenIssuance()
    )
    .get('/confirm/:link',
        confirmEmail(),
        sendSucces()
    );
