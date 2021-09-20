import fs from 'fs';

export default function makeDirctory(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
