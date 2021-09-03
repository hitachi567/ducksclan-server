import BetterSqlite3 from 'better-sqlite3';
import ActrivateCode from './entities/ActivateCode';
import DisabledUser from './entities/DisabledUser';
import Journal from './entities/Journal';
import Token from './entities/Token';
import User from './entities/User';
import UserOnline from './entities/UserOnline';
import UserPhoto from './entities/UserPhoto';

export default class Database {
    protected readonly db: BetterSqlite3.Database;

    constructor() {
        this.db = new BetterSqlite3('database.sqlite');
        const statements: BetterSqlite3.Statement<any[]>[] = [];
        statements.push(this.db.prepare(User.prepare));
        statements.push(this.db.prepare(UserOnline.prepare));
        statements.push(this.db.prepare(UserPhoto.prepare));
        statements.push(this.db.prepare(DisabledUser.prepare));
        statements.push(this.db.prepare(ActrivateCode.prepare));
        statements.push(this.db.prepare(Token.prepare));
        statements.push(this.db.prepare(Journal.prepare));
        for (const statement of statements) {
            statement.run();
        }
    }

    close() {
        this.db.close();
    }

    static async init() {
        const db = new Database();
        db.close();
    }

}
