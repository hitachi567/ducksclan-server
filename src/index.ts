// import http from 'http';
// import initExpressApp from './initExpressApp';
// import Config from './Config';
// // import { routs } from './routs';
// import Log from './utils/Log';
// import Database from './database/Database';

import { getTableSql } from "./database/getSql";

// export const config = new Config();
// Database.init().then(main).catch(console.error);

// async function main(db: Database) {
//     db.close();
    
//     const app = initExpressApp(/* routs */);
//     const server = http.createServer(app);
//     server.listen(config.port, listener);
// }

// function listener() {
//     Log.info(`Server started on http://localhost:${config.port}`);
// }
getTableSql()