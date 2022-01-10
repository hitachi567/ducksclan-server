import { Router } from 'express';
import BodyValidationService from '../services/body.validation';
import authenticate from '../middleware/authenticate';
import registerEmail from '../auth/registration/register-email';
import changeEmail from '../auth/registration/change-email';
import confirmEmail from '../auth/registration/confirm-email';

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
