import { DeleteResult, LessThanOrEqual, FindConditions, EntityRepository } from 'typeorm';
import { day } from '@hitachi567/core';
import { AbstractRepository } from '../database/abstract.repository';
import { TokenRefresh } from '../entities';

@EntityRepository(TokenRefresh)
export default class TokenRefreshRepository extends AbstractRepository<TokenRefresh> {

    findByUserID(user_id: string) {

        return this.repository.find({
            where: {
                user: {
                    id: user_id
                }
            }
        });

    }

    findNotRelevant(user_id?: string): Promise<TokenRefresh[]> {

        let date = this.ago(30).toISOString();

        let conditions: FindConditions<TokenRefresh> = {
            created_at: LessThanOrEqual(date)
        };

        if (user_id) {
            conditions.user = {
                id: user_id
            }
        }

        return this.repository.find(conditions);

    }

    removeNotRelevant(user_id?: string): Promise<DeleteResult> {

        let date = this.ago(30).toISOString();

        let conditions: FindConditions<TokenRefresh> = {
            created_at: LessThanOrEqual(date)
        };

        if (user_id) {
            conditions.user = {
                id: user_id
            }
        }

        return this.repository.delete(conditions);

    }

    removeByFingerprint(fingerprint: string): Promise<DeleteResult> {

        return this.repository.delete({ fingerprint });

    }

    removeByUserID(user_id: string): Promise<DeleteResult> {

        return this.repository.delete({
            user: {
                id: user_id
            }
        });

    }

    protected ago(days: number) {
        return new Date(Date.now() - days * day('ms'))
    }

}
