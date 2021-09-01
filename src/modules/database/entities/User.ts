import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export default class User {

    @PrimaryColumn({ unique: true })
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname?: string;

    @Column({ nullable: true })
    about?: string;

    @Column({ nullable: true })
    avatar?: number;

    @Column({ nullable: true })
    activate_date?: Date;
    
    @Column()
    create_date: Date;

}
