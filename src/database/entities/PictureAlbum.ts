import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class PictureAlbum {

    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    user_id: string;

    @Column()
    number: string;

    @Column()
    picture: string;

}
