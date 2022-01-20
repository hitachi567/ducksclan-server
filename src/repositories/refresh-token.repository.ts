import { DeleteResult, LessThanOrEqual, FindConditions, MoreThan, EntityRepository, Repository } from 'typeorm';
import RefreshToken from '../entities/refresh-token';
import { day } from '@hitachi567/core';

@EntityRepository(RefreshToken)
export default class RefreshTokenRepository extends Repository<RefreshToken> {

    findByUserID(user_id: string) {

        return this.find({
            where: {
                user: {
                    id: user_id
                }
            }
        });

    }

    findNotRelevant(user_id?: string): Promise<RefreshToken[]> {

        let date = this.ago(30).toISOString();

        let conditions: FindConditions<RefreshToken> = {
            created_at: LessThanOrEqual(date)
        };

        if (user_id) {
            conditions.user = {
                id: user_id
            }
        }

        return this.find(conditions);

    }

    removeNotRelevant(user_id?: string): Promise<DeleteResult> {

        let date = this.ago(30).toISOString();

        let conditions: FindConditions<RefreshToken> = {
            created_at: LessThanOrEqual(date)
        };

        if (user_id) {
            conditions.user = {
                id: user_id
            }
        }

        return this.delete(conditions);

    }

    removeByFingerprint(fingerprint: string): Promise<DeleteResult> {

        return this.delete({ fingerprint });

    }

    protected ago(days: number) {
        return new Date(Date.now() - days * day('ms'))
    }

}
