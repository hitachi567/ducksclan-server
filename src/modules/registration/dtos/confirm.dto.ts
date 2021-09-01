import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class ConfirmDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    code: string;

}
