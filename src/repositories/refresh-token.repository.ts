import { EntityManager, DeleteResult } from 'typeorm';
import AbstractRepository from '../database/abstract.repository';
import RefreshToken from '../entities/refresh-token';

export default class RefreshTokenRepository extends AbstractRepository<RefreshToken> {

    constructor(manager: EntityManager) {

        super(manager, RefreshToken);

    }

    removeNotRelevant(user_id?: string): Promise<DeleteResult> {

        // let sql = `created_at + '30 day' <= current_timestamp`; // postgres syntax
        let condition = `datetime(created_at, '+30 day') <= datetime('now')`; // sqlite syntax

        let query = this.sql().delete().where(condition);

        if (user_id) {
            query.andWhere('user_id = :user_id', { user_id })
        }

        return query.execute();

    }

    removeByFingerprint(fingerprint: string): Promise<DeleteResult> {

        let condition = 'fingerprint = :fingerprint';

        let query = this.sql().delete().where(condition, { fingerprint });

        return query.execute();

    }

    protected sql() {

        return this.repository.createQueryBuilder('token');

    }

}
