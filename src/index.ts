import App from './app';
import Database from './database/index';
import { AuthRouter } from './routers/auth';
import RefreshTokenRepository from './repositories/refresh-token.repository';
import User from './entities/user';
import { Generator } from '@hitachi567/core';
import RefreshToken from './entities/refresh-token';
import Repositories from './repositories/index';

export const app = new App(App.getConfiguration());
app.app.use('/api/auth', AuthRouter);

main().catch(console.log);

async function main() {
    await Database.connect();

    let rep = new Test();

    // console.log(await rep.test());


    // rep.createInstances();
    // rep.print();

    // await rep.saveInstances();
    // rep.print();

    // rep.setNull();
    // rep.print();

    // await rep.saveInstances();
    // rep.print();

    app.listen();
}

class Test extends Repositories {

    user!: User;
    token!: RefreshToken;

    createInstances() {

        this.user = User.init(Generator.sequense(10));
        this.user.confirm_link = Generator.sequense(20);
        this.token = RefreshToken.init({
            fingerprint: Generator.sequense(32),
            token: Generator.sequense(20),
            user: this.user
        });

    }

    async saveInstances() {

        this.user = await this.userRepository.save(this.user);
        this.token = await this.refreshTokenRepository.save(this.token);

    }

    print() {
        console.log();
        console.log(this.user.toJSON());
        console.log(this.token.toJSON());
        console.log();
    }

    setNull() {
        this.user.confirm_link = null;
    }

}
