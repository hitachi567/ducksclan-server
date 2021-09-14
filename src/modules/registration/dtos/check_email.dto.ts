import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CheckEmailDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

}
