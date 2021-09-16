import { IsNotEmpty, IsString } from 'class-validator';

export default class ConfirmDto {

    @IsNotEmpty()
    @IsString()
    code: string;

}
