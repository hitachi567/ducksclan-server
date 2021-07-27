import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class DisabledReasons {

    @PrimaryColumn({ unique: true })
    id: number;

    @Column()
    reason: string;

    @Column()
    view: string;

}
