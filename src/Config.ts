import dotenv from 'dotenv';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';
import makeDirctory from './lib/makeDirectory';
import toNumber from './lib/toNumber';

export default class Config {
    readonly port: string | number;
    readonly subdomainOffset: number;
    readonly ssl?: { key: string, cert: string };
    protected envPath: string;
    protected _jwtAccessSecret: string;
    protected _jwtRefreshSecret: string;
    readonly pg: {
        host: string,
        port: number,
        user: string,
        password: string
        database: string
    };
    readonly nodeMail: {
        service: string,
        email: string,
        password: string
    }

    constructor() {
        makeDirctory('./logs/');
        makeDirctory('./logs/console');
        makeDirctory('./logs/database');

        const isProd = process.env.NODE_ENV === 'production';
        this.envPath = isProd ? './prod.env' : './dev.env';
        dotenv.config({ path: this.envPath });

        this.ssl = this.getSsl();
        this.port = process.env.port || 5000;
        this.subdomainOffset = toNumber(process.env.subdomainOffset || (isProd ? 2 : 1));
        this._jwtAccessSecret = process.env.jwtAccessSecret || v4();
        this._jwtRefreshSecret = process.env.jwtRefreshSecret || v4();
        this.pg = {
            host: process.env.PGHOST || 'localhost',
            port: toNumber(process.env.PGPORT || 5432),
            user: process.env.PGUSER || 'postgres',
            password: process.env.PGPASSWORD || 'root',
            database: process.env.PGDATABASE || 'ducks-database'
        }
        this.nodeMail = {
            service: process.env.service || 'gmail',
            email: process.env.email || 'ducks.clan.app@gmail.com',
            password: process.env.password || 'Qtr`CNSb"9QK6K2T'
        }
        this.rewriteEnvFile();
    }

    rewriteEnvFile() {
        const newEnvFile =
            `port=${this.port}\n` +
            `subdomainOffset=${this.subdomainOffset}\n` +
            `jwtAccessSecret=${this._jwtAccessSecret}\n` +
            `jwtRefreshSecret=${this._jwtRefreshSecret}\n` +
            `PGUSER=${this.pg.user}\n` +
            `PGPASSWORD=${this.pg.password}\n` +
            `PGDATABASE=${this.pg.database}\n` +
            `PGHOST=${this.pg.host}\n` +
            `PGPORT=${this.pg.port}\n` +
            `nodeMailService=${this.nodeMail.service}\n` +
            `nodeMailEmail=${this.nodeMail.email}\n` +
            `nodeMailPassword=${this.nodeMail.password}\n`;
        writeFileSync(this.envPath, newEnvFile);
    }

    updateJwtSecrets() {
        this._jwtAccessSecret = v4();
        this._jwtRefreshSecret = v4();
        this.rewriteEnvFile();
    }

    get jwtSecrets() {
        return {
            access: this._jwtAccessSecret,
            refresh: this._jwtRefreshSecret
        }
    }

    protected getSsl() {
        const key = resolve('./ssl', 'key.pem');
        const cert = resolve('./ssl', 'cert.pem');

        if (existsSync(key) && existsSync(cert)) {
            return {
                key: readFileSync(key).toString(),
                cert: readFileSync(cert).toString()
            }
        }
    }
}
