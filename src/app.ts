import { AppOptions, initApp, taggingMiddleware } from '@hitachi567/core';
import express from 'express';

interface Configuration extends AppOptions {
    link: string;
    port: number;
}

export default class App {

    app: express.Application;
    configuration: Configuration;

    constructor(configuration: Configuration) {
        this.configuration = configuration;
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
            cookieSecret: 'secret',
            link: 'http://ducksclan.ru/',
            port: 5000,
        }
    }

}
