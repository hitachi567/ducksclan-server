import chalk from 'chalk';
import Datestamp from './Datestamp';

export default class Log {
    static info(message: any = '', ...optionalParams: any[]) {
        const type = `[${chalk.cyan('INFO')}] `;
        const timestamp = chalk.yellowBright(new Datestamp().daytime) + ': ';
        console.log(type + timestamp + message, ...optionalParams);
    }

    static warn(message: any = '', ...optionalParams: any[]) {
        const type = `[${chalk.yellow('WARN')}] `;
        const timestamp = chalk.yellowBright(new Datestamp().daytime) + ': ';
        console.log(type + timestamp + message, ...optionalParams);
    }

    static error(message: any = '', ...optionalParams: any[]) {
        const type = `[${chalk.redBright('ERROR')}] `;
        const timestamp = chalk.bold.redBright(new Datestamp().daytime) + ': ';
        console.log(`%s${message}`, type + timestamp, ...optionalParams);
    }
}
