import { EntityManager, DeleteResult } from 'typeorm';

export type TransactionWrapper<B, L, R = void> = (body: B, locals: L) => Transaction<R>;
export type Transaction<R = void> = (manager: EntityManager) => Promise<R>;
export type RemoveFunction = (data: string) => Promise<DeleteResult>;
