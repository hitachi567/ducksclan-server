import { PrimaryGeneratedColumn } from 'typeorm';
import { SerialEntityInteraface } from '../interfaces';
import BaseEntity from './a.base.entity';

export default abstract class SerialEntity extends BaseEntity implements SerialEntityInteraface {

    @PrimaryGeneratedColumn()
    id!: number;

}
