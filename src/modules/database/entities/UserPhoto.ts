import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserPhoto {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    number: number;

    @Column({ unique: true })
    url: string;

    @Column()
    date: Date;

}
