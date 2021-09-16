import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class RegistrationDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    password: string;

}
