import { Pool, Client } from 'pg';
import { config } from '..';
import getSql from './getSql';

const tables = [
    'user',
    'user_photo',
    'user_online',
    'disabled_user',
    'token',
    'activate_code',
    'journal'
];

export default class Database {
    protected pool: Pool;

    constructor() {
        this.pool = new Pool(config.pg);
    }

    getClient() {
        return this.pool.connect();
    }

    static async createTables() {
        const client = new Client(config.pg);
        await client.connect();
        try {
            for (const table of tables) {
                const sql = getSql(`./tables/${table}.sql`);
                await client.query(sql);
            }
        } finally {
            await client.end();
        }
    }

    static async deleteTables() {
        const client = new Client(config.pg);
        await client.connect();
        try {
            for (const table of tables) {
                const sql = `drop table if exists "${table}" cascade;`;
                await client.query(sql);
            }
        } finally {
            await client.end();
        }
    }
}



// (async () => {
//     const client = await pool.connect()
//     try {
//         const res = await client.query<{ date: Date }>('SELECT * FROM current_timestamp as date')
//         console.log(res.rows[0].date)
//     } finally {
//         client.release()
//     }
// })().catch(err => console.log(err.stack));