import App from './app';
import Database from './database';
import entities from './entities';

export const app = new App(App.getConfiguration());

main().catch(console.log);

async function main() {
    await Database.init(entities);
    app.listen();
}
