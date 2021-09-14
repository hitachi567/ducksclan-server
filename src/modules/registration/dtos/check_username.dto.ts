import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class CheckUsernameDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

}
