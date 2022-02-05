import { EntityManager } from 'typeorm';
import Database from '../database';
import UserRepository from './user.repository';
import TokenRefreshRepository from './token.refresh.repository';
import ConfirmLinkRepository from './confirm.link.repository';

interface IRepositories {
    user: UserRepository;
    tokenRefresh: TokenRefreshRepository;
    confirmLink: ConfirmLinkRepository;
}

export default abstract class Repositories {
    protected manager: EntityManager;
    protected reps: IRepositories;

    constructor(manager?: EntityManager) {
        this.manager = manager || Database.instance.manager;

        const getRep = this.manager.getCustomRepository;

        this.reps = {
            user: getRep(UserRepository),
            tokenRefresh: getRep(TokenRefreshRepository),
            confirmLink: getRep(ConfirmLinkRepository),
        }
    }
}
