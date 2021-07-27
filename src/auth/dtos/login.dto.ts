import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export default class LoginDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;

}
