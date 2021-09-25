import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class LoginDto {

    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;

}
