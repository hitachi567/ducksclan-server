import Database from './database';

Database.connect().then(() => {
    Database.synchronize();
}, error => {
    console.log(error);
});
