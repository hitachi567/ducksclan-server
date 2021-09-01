import chalk from 'chalk';
import fs from 'fs';
import Log from './Log';

export default function makeDirctory(path: string) {
    if (!fs.existsSync(path)) {
        Log.info('making directiory - ' + chalk.bold(path));
        fs.mkdirSync(path);
    }
}
