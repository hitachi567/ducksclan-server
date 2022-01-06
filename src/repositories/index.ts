import { EntityManager } from 'typeorm';
import Database from '../database/database';
import UserRepository from './user.repository';
import RefreshTokenRepository from './refresh-token.repository';

export default abstract class Repositories {

    protected userRepository: UserRepository;
    protected refreshTokenRepository: RefreshTokenRepository;
    protected manager: EntityManager;

    constructor(manager?: EntityManager) {
        this.manager = manager || Database.manager;
        this.userRepository = new UserRepository(this.manager);
        this.refreshTokenRepository = new RefreshTokenRepository(this.manager);
    }

}
