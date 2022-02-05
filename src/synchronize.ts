import Database from './database';
import entities from './entities';

main().catch(error => {
    console.log(error);
});

async function main() {
    await Database.init(entities);
    await Database.instance.synchronize();
}
