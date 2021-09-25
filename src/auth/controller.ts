import { NextFunction, Request, Response } from 'express';

export default class AuthController {
    registrationCheck(request: Request, response: Response) {
        response.send({
            body: request.body
        })
    }

    registration(request: Request, response: Response) {
        response.send({
            body: request.body
        })
    }

    registrationConfirm(request: Request, response: Response) {
        response.send({
            body: request.body
        })
    }

    login(request: Request, response: Response) {
        response.send({
            body: request.body
        })
    }

    loginRefresh(request: Request, response: Response) {
        response.send({
            body: request.body
        })
    }

    logout(request: Request, response: Response) {
        response.send({
            body: request.body
        })
    }

}