import App from './app';
import Database from './database/index';

export const app = new App(App.getConfiguration());

main().catch(console.log);

async function main() {
    await Database.connect();
    app.listen();
}
