import chalk from 'chalk';
import { createRollingFileLogger } from 'simple-node-logger';
import makeDirctory from './makeDirectory';

export default class Log {
    protected static defaultLogger = Log.getLogger('default');
    protected static databaseLogger = Log.getLogger('database');

    protected static getLogger(type: string) {
        makeDirctory('./logs');
        makeDirctory('./logs/' + type);
        return createRollingFileLogger({
            logDirectory: './logs/' + type,
            fileNamePattern: '<DATE>.log',
            domain: type,
            dateFormat: 'YYYY-MM-DD',
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        });
    }

    protected static begin(level: string, date: Date) {
        let upperLevel = level.toUpperCase(),
            dateColor = chalk.yellowBright,
            levelColor = chalk.bold;
        switch (upperLevel) {
            case 'INFO':
                levelColor = levelColor.cyan;
                break;
            case 'WARN':
                levelColor = levelColor.yellow;
                break;
            case 'ERROR':
                dateColor = dateColor.bold.redBright;
                levelColor = levelColor.redBright;
                break;
            default:
                levelColor = levelColor.cyan;
                break;
        }
        return `[${levelColor(upperLevel)}] ${dateColor(date.toISOString())}: `;
    }

    protected static log(begin: string, message: any, ...args: any[]) {
        if (typeof message === 'object') {
            console.log('%s%O', begin, message, ...args);
        } else {
            console.log('%s' + message, begin, ...args);
        }
    }

    static info(message: any, ...args: any[]) {
        let begin = Log.begin('info', new Date());
        Log.log(begin, message, ...args);
        Log.defaultLogger.info(message, ...args);
    }

    static warn(message: any, ...args: any[]) {
        let begin = Log.begin('warn', new Date());
        Log.log(begin, message, ...args);
        Log.defaultLogger.warn(message, ...args);
    }

    static error(message: any = '', ...args: any[]) {
        let begin = Log.begin('error', new Date());
        Log.log(begin, message, ...args);
        Log.defaultLogger.error(message, ...args);
    }

    static db(...arr: any[]) {
        this.databaseLogger.info(...arr)
    }

}
