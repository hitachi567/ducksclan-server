import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class ActrivateLink {

    @PrimaryColumn({ unique: true })
    user_id: string;

    @Column({ unique: true })
    link: string;

}
