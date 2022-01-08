import { EntityManager, ObjectLiteral, Repository, EntityTarget } from 'typeorm';

export default abstract class AbstractRepository<Entity extends ObjectLiteral> {

    protected repository: Repository<Entity>

    constructor(manager: EntityManager, entity: EntityTarget<Entity>) {

        this.repository = manager.getRepository<Entity>(entity);

    }

    save(data: Entity): Promise<Entity> {

        return this.repository.save(data);

    }

    remove(data: Entity): Promise<Entity> {

        return this.repository.remove(data);

    }

}
