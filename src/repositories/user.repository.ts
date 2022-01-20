import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { FindUserOptions } from '../interfaces';
import User from '../entities/user';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    findOneByID(id: string, options?: FindUserOptions): Promise<User | undefined> {

        let relations: string[] = [];

        if (options?.refreshToken) {

            relations.push('tokens');

        }

        return this.findOne({ where: { id }, relations });

    }

    findOneByEmail(email: string): Promise<User | undefined> {

        return this.findOne({ where: { email } });

    }

    findOneByUsername(username: string): Promise<User | undefined> {

        return this.findOne({ where: { username } });

    }

    findOneByConfirmLink(confirm_link: string): Promise<User | undefined> {

        return this.findOne({ where: { confirm_link } });

    }

    removeByID(id: string): Promise<DeleteResult> {

        return this.delete({ id });

    }

}
