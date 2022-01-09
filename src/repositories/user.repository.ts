import { EntityManager, DeleteResult } from 'typeorm';
import AbstractRepository from '../database/abstract.repository';
import User from '../entities/user';

export default class UserRepository extends AbstractRepository<User> {

    constructor(manager: EntityManager) {

        super(manager, User);

    }

    findOneByID(id: string): Promise<User | undefined> {

        return this.repository.findOne({ where: { id } });

    }

    findOneByEmail(email: string): Promise<User | undefined> {

        return this.repository.findOne({ where: { email } });

    }

    findOneByUsername(username: string): Promise<User | undefined> {

        return this.repository.findOne({ where: { username } });

    }

    findOneByConfirmLink(confirm_link: string): Promise<User | undefined> {

        return this.repository.findOne({ where: { confirm_link } });

    }

    removeByID(id: string): Promise<DeleteResult> {

        let condition = 'user.id = :id';

        let query = this.sql().delete().where(condition, { id });

        return query.execute();

    }

    protected sql() {

        return this.repository.createQueryBuilder('user');

    }

}
