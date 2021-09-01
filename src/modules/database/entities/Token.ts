import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Token {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column({ unique: true })
    token: string;

    @Column({ nullable: true })
    ip: string;

    @Column({ nullable: true })
    fingerprint: string;

    @Column()
    date: Date;

}
