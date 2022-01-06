import { EntityManager } from 'typeorm';
import AbstractRepository from '../database/abstract.repository';
import RefreshToken from '../entities/refresh-token';

export default class RefreshTokenRepository extends AbstractRepository<RefreshToken> {

    constructor(manager: EntityManager) {

        super(manager, RefreshToken);

    }

}
