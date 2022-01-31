import { ObjectLiteral, AbstractRepository as AR } from 'typeorm';

export abstract class AbstractRepository<Entity extends ObjectLiteral> extends AR<Entity> {

    save(data: Entity): Promise<Entity> {

        return this.repository.save(data);

    }

    remove(data: Entity): Promise<Entity> {

        return this.repository.remove(data);

    }

}
