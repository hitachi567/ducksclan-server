import UserDatabase from "../database/user.database";


export default class User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    create_date: Date;
    online: {
        status: boolean,
        date: Date
    }
    photos: {
        id: string,
        number: number,
        url: string,
        date: Date
    }[]
    
    static async find(user_id: string) {
        const db = await UserDatabase.init();
        db.
    }


}