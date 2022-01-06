import { EntityManager } from 'typeorm';
import AbstractRepository from '../database/abstract.repository';
import User from '../entities/user';

export default class UserRepository extends AbstractRepository<User> {

    constructor(manager: EntityManager) {

        super(manager, User);

    }

}
