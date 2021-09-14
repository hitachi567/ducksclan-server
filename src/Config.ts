import dotenv from 'dotenv';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';
import toNumber from './utils/toNumber';

export default class Config {
    readonly port: string | number;
    readonly ssl?: { key: string, cert: string };
    protected envPath: string;
    protected _jwtAccessSecret: string;
    protected _jwtRefreshSecret: string;
    pg: {
        host: string,
        port: number,
        user: string,
        password: string
        database: string
    };

    constructor() {
        this.envPath = process.env.NODE_ENV === 'production' ? './prod.env' : './dev.env';
        dotenv.config({ path: this.envPath });

        this.ssl = this.getSsl();
        this.port = process.env.port || 5000;
        this._jwtAccessSecret = process.env.jwtAccessSecret || v4();
        this._jwtRefreshSecret = process.env.jwtRefreshSecret || v4();
        this.pg = {
            host: process.env.PGHOST || 'localhost',
            port: toNumber(process.env.PGPORT || '5432'),
            user: process.env.PGUSER || 'postgres',
            password: process.env.PGPASSWORD || 'root',
            database: process.env.PGDATABASE || 'ducks-database'
        }
        this.rewriteEnvFile();
    }

    rewriteEnvFile() {
        const newEnvFile =
            `port=${this.port}\n` +
            `jwtAccessSecret=${this._jwtAccessSecret}\n` +
            `jwtRefreshSecret=${this._jwtRefreshSecret}\n` +
            `PGUSER=${this.pg.user}\n` +
            `PGPASSWORD=${this.pg.password}\n` +
            `PGDATABASE=${this.pg.database}\n` +
            `PGHOST=${this.pg.host}\n`;
            `PGPORT=${this.pg.port}\n`;
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
