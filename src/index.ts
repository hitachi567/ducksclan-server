import App from './app';
import Database from './database/database';

export const app = new App(App.getConfiguration());

main().catch(console.log);

async function main() {
    await Database.init([]);
    app.listen();
}
