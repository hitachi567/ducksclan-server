import chalk from 'chalk';
import Datestamp from './Datestamp';
import { createRollingFileLogger } from 'simple-node-logger';
import makeDirctory from './makeDirectory';

export default class Log {

    protected static consoleLogger = Log.getLogger('console')

    protected static databaseLogger = Log.getLogger('database')

    protected static getLogger(type: string) {
        makeDirctory('./logs');
        makeDirctory('./logs/' + type);
        return createRollingFileLogger({
            logDirectory: './logs/' + type,
            fileNamePattern: '<DATE>.log',
            dateFormat: 'YYYY-MM-DD',
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        });
    }

    static restart() {
        let str1 = '-------------------------------------------------------------------------------------------';
        let str2 = '                                          restart                                          ';
        Log.consoleLogger.info(str1);
        Log.consoleLogger.info(str2);
        Log.consoleLogger.info(str1);
        Log.databaseLogger.info(str1);
        Log.databaseLogger.info(str2);
        Log.databaseLogger.info(str1);
    }

    static db(...arr: any[]) {
        this.databaseLogger.info(...arr)
    }

    static info(message: any = '', ...optionalParams: any[]) {
        const type = `[${chalk.cyan('INFO')}] `;
        const timestamp = chalk.yellowBright(new Datestamp().daytime) + ': ';
        console.log(type + timestamp + message, ...optionalParams);
        Log.consoleLogger.info(message, ...optionalParams)
    }

    static warn(message: any = '', ...optionalParams: any[]) {
        const type = `[${chalk.yellow('WARN')}] `;
        const timestamp = chalk.yellowBright(new Datestamp().daytime) + ': ';
        console.log(type + timestamp + message, ...optionalParams);
        Log.consoleLogger.warn(message, ...optionalParams)
    }

    static error(message: any = '', ...optionalParams: any[]) {
        const type = `[${chalk.redBright('ERROR')}] `;
        const timestamp = chalk.bold.redBright(new Datestamp().daytime) + ': ';
        console.log(`%s${message}`, type + timestamp, ...optionalParams);
        Log.consoleLogger.error(message, ...optionalParams)
    }
}
