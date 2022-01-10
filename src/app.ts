import { AppOptions, initApp, JwtSecrets, taggingMiddleware, JsonWebToken } from '@hitachi567/core';
import express from 'express';
import { TokenPayloadInterface } from './interfaces/token.interface';

interface Configuration extends AppOptions {
    link: string;
    port: number;
    jwtSecrets: JwtSecrets;
}

export default class App {

    app: express.Application;
    jwt: JsonWebToken<TokenPayloadInterface>;
    configuration: Configuration;

    constructor(configuration: Configuration) {

        this.configuration = configuration;

        this.jwt = new JsonWebToken(configuration.jwtSecrets);

        this.app = initApp(configuration);
        this.app.use(taggingMiddleware());

    }

    listen() {

        let text = `listening on ${this.configuration.port}...`;

        this.app.listen(
            this.configuration.port,
            () => console.log(text)
        );

    }

    static getConfiguration(): Configuration {
        return {
            jwtSecrets: JsonWebToken.generateJwtSecrets(),
            cookieSecret: 'secret',
            link: 'http://ducksclan.ru/',
            port: 5000,
        }
    }

}
