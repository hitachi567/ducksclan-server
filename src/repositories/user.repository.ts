import { DeleteResult, EntityRepository } from 'typeorm';
import { AbstractRepository } from '../database/abstract.repository';
import { FindUserOptions } from '../interfaces';
import { User } from '../entities';

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

    findOneByConfirmLink(payload: string): Promise<User | undefined> {

        return this.repository.createQueryBuilder('user')
            .leftJoinAndSelect('user.confirmLink', 'link')
            .where('link.payload = :payload', { payload })
            .getOne();

    }

    removeByID(id: string): Promise<DeleteResult> {

        return this.repository.delete({ id });

    }

    private getRelations(options?: FindUserOptions) {

        let relations: string[] = [];

        if (options?.tokenRefresh) {
            relations.push('tokens');
        }

        if (options?.confirmLink) {
            relations.push('confirmLink');
        }

        if (options?.userOnline) {
            relations.push('online');
        }

        if (options?.userProfile) {
            relations.push('profile');
        }

        return relations;

    }

}
