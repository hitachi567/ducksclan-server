import { TMiddleware } from './TMiddleware';
import { config } from '..';

export default function subdomain(middleware: TMiddleware, subdomain?: string): TMiddleware {
    return function (request, response, next) {
        const requestedSplit = request.hostname.split('.');
        const expectedSplit = subdomain ? subdomain.split('.') : [];

        for (let i = 0; i < config.subdomainOffset; i++) {
            requestedSplit.pop();
        }

        if (requestedSplit.length !== expectedSplit.length) {
            return next();
        }

        let match = true;

        for (let i = 0; i < requestedSplit.length; i++) {
            if (requestedSplit[i] !== expectedSplit[i]) {
                match = false;
                break;
            }
        }

        if (match) {
            return middleware(request, response, next);
        }
    }
}
