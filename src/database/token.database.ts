import Database from './Database';

class TokenDatabase extends Database {
    saveToken(data: {
        user_id: string,
        token: string,
        date: Date,
        fingerprint?: string,
        ip?: string
    }) {


    }

    getToken(user_id: string) {
        const sql = 'select id, user_id, fingerprint, ip, token, date from token where user_id=@user_id';
        const statement = this.db.prepare<{ user_id: string }>(sql);
        return statement.all({ user_id });
    }

    get removeToken() {

        function byToken(token: string) {

        }

        function byUserID(user_id: string) {

        }

        function byFingerprint(fingerprint: string) {

        }

        function byIP(ip: string) {

        }

        return
    }
}