import { EntityRepository, Repository } from 'typeorm';
import ConfirmLink from '../entities/confirm.link';
import { AbstractRepository } from '../database/abstract.repository';

@EntityRepository(ConfirmLink)
export default class ConfirmLinkRepository extends AbstractRepository<ConfirmLink>  {

    findOneByPayload(payload: string) {

        return this.repository.findOne({ where: { payload } });

    }

    findOneByUserID(user_id: string) {

        return this.repository.findOne({
            where: {
                user: {
                    id: user_id
                }
            }
        });

    }

    deleteByUserID(user_id: string) {

        return this.repository.delete({
            user: {
                id: user_id
            }
        })

    }

}
