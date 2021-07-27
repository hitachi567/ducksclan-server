import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class RegistrationConfirmDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    code: string;

}
