import Database from './Database';
import User from './entities/User';


export default class UserDatabase extends Database {
    get getUser() {
        const db = this.db;

        function byUsername(username: string) {
            const sql = 'select id from user where username=@username';
            const statement = db.prepare<{ username: string }>(sql);
            return statement.get({ username });
        }

        function byEmail(email: string) {
            const sql = 'select id from user where email=@email';
            const statement = db.prepare<{ email: string }>(sql);
            return statement.get({ email });
        }

        function byUsernameAndEmail(username: string, email: string) {    
            const sql = 'select id from user where username=@username and email=@email';
            const statement = db.prepare<{ username: string, email: string }>(sql);
            return statement.get({ username, email });
        }

        function byUsernameOrEmail(username: string, email: string) {
            const sql = 'select id from user where username=@username or email=@email';
            const statement = db.prepare<{ username: string, email: string }>(sql);
            return statement.get({ username, email });
        }

        return {
            byEmail,
            byUsername,
            byUsernameAndEmail,
            byUsernameOrEmail
        }
    }

    createUser(data: {
        id: string,
        username: string,
        email: string,
        password: string
    }) {
        const sql = `
            insert into user (id, username, email, password, create_date)
            values (@id, @username, @email, @password, @create_date)
        `;
        const statement = this.db.prepare<{
            id: string,
            username: string,
            email: string,
            password: string,
            create_date: string
        }>(sql);
        return statement.run({
            ...data,
            create_date: new Date().toISOString()
        });
    }

}