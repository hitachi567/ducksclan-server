import { EntityManager } from 'typeorm';
import Database from '../database';
import UserRepository from './user.repository';
import RefreshTokenRepository from './refresh-token.repository';
import ConfirmLinkRepository from './confirm.link.repository';

export default abstract class Repositories {

    protected userRepository: UserRepository;
    protected refreshTokenRepository: RefreshTokenRepository;
    protected confirmLinkRepository: ConfirmLinkRepository;
    protected manager: EntityManager;

    constructor(manager?: EntityManager) {
        this.manager = manager || Database.manager;
        this.userRepository = this.manager.getCustomRepository(UserRepository);
        this.refreshTokenRepository = this.manager.getCustomRepository(RefreshTokenRepository);
        this.confirmLinkRepository = this.manager.getCustomRepository(ConfirmLinkRepository);
    }

}
