import { EntityRepository, Repository } from 'typeorm';
import { ApiError } from '@hitachi567/core';
import ConfirmLink from '../entities/confirm.link';

@EntityRepository(ConfirmLink)
export default class ConfirmLinkRepository extends Repository<ConfirmLink>  {

    async findByPayload(payload: string) {

        let link = await this.findOne({ where: { payload } });

        if (!link) {

            throw ApiError.NotFound('invalid link');

        }

        return link;

    }

    async findByUserID(user_id: string) {

        let link = await this.findOne({
            where: {
                user: {
                    id: user_id
                }
            }
        });

        if (!link) {

            throw ApiError.NotFound('invalid user_id');

        }

        return link;

    }

    deleteByUserID(user_id: string) {

        return this.delete({
            user: {
                id: user_id
            }
        })

    }

}
