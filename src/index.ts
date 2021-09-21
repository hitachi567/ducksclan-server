import http from 'http';
import initExpressApp from './initExpressApp';
import Config from './Config';
import Database from './database/Database';
import { routs } from './routs';
import Log from './lib/Log';
import DestructionLink from './database/entities/DestructionLink';

// setInterval(async function () {
//     await Token.destroyAllNotRelevant();
//     await ActivateCode.destroyAllNotRelevant();
// }, 30 * 24 * 60 * 60 * 1000)
Log.restart();
export const config = new Config();
export const database = new Database();
main().catch(Log.error);

async function main() {
    await database.authenticate();
    await database.sync();

    // new MailService().sendConfirmMessage('Pink.meow@outlook.com', 'plus', '342423', 'http://ducksclan.ru/jew')
    // const res1 = await Token.findByPk('fdsf')
    // const res2 = await Token.findByFingerprint('fdsf')

    // console.log(res1?.toJSON(), res2?.toJSON());
    
    
    Log.info(DestructionLink.generateLinkPayload())

    

    const app = initExpressApp(routs);
    const server = http.createServer(app);
    server.listen(config.port, listener);
}

function listener() {
    Log.info(`Server started on http://localhost:${config.port}`);
}
