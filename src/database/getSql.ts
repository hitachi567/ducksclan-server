import fs from 'fs';
import { isAbsolute, resolve } from 'path';

export default function getSql(path: string) {
    const _path = isAbsolute(path) ? path : resolve(__dirname, 'sql', path);
    if (fs.existsSync(_path)) {
        return fs.readFileSync(_path).toString();
    } else {
        throw new Error('file not found - ' + _path);
    }
}

export function getTableSql() {
    const sqls = [
        ...getSql('./tables/user.sql').split(';'),
        ...getSql('./tables/token.sql').split(';'),
        ...getSql('./tables/journal.sql').split(';'),
    ]
    console.log(sqls.length);
    
    
}