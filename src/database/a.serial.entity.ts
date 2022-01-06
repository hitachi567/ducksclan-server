import { PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './a.base.entity';

export default abstract class SerialEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

}
