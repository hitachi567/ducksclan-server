import { TMiddleware } from './TMiddleware';

export default function subdomain(subdomain: string, fn: TMiddleware): TMiddleware {
    return function (request, response, next) {
        const requestedSplit = request.hostname.split('.');
        const expectedSplit = subdomain.split('.');
        requestedSplit.pop();

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
            return fn(request, response, next);
        }

        next();
    }
}
