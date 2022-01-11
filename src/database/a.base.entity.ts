import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntityInteraface } from '../interfaces';

export default abstract class BaseEntity implements BaseEntityInteraface {

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}
