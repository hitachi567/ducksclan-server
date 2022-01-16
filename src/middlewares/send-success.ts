import { Middleware } from '@hitachi567/core';
import { ResponseBody } from '../interfaces';

export function sendSucces(): Middleware {
    return (request, response) => {

        let body: ResponseBody<undefined> = {
            status: 200,
            message: 'success',
            payload: undefined
        }

        response.status(200).json(body);

    }
}
