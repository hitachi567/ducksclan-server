import { AbstractRepository, DeleteResult, EntityRepository } from 'typeorm';
import { FindUserOptions } from '../interfaces';
import User from '../entities/user';

@EntityRepository(User)
export default class UserRepository extends AbstractRepository<User> {

    findOneByID(id: string, options?: FindUserOptions): Promise<User | undefined> {

        let relations = this.getRelations(options);

        return this.repository.findOne({ where: { id }, relations });

    }

    findOneByEmail(email: string, options?: FindUserOptions): Promise<User | undefined> {

        let relations = this.getRelations(options);

        return this.repository.findOne({ where: { email }, relations });

    }

    findOneByUsername(username: string, options?: FindUserOptions): Promise<User | undefined> {

        let relations = this.getRelations(options);

        return this.repository.findOne({ where: { username }, relations });

    }

    findOneByConfirmLink(confirm_link: string, options?: FindUserOptions): Promise<User | undefined> {

        let relations = this.getRelations(options);

        return this.repository.findOne({ where: { confirm_link }, relations });

    }

    removeByID(id: string): Promise<DeleteResult> {

        return this.repository.delete({ id });

    }

    save(data: User): Promise<User> {

        return this.repository.save(data);

    }

    remove(data: User): Promise<User> {

        return this.repository.remove(data);

    }

    private getRelations(options?: FindUserOptions) {

        let relations: string[] = [];

        if (options?.refreshToken) {

            relations.push('tokens');

        }

        return relations;

    }

}
