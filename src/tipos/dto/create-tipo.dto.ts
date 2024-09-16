import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTipoDto {
    @IsString()
    @IsNotEmpty()
    tp_nome: string;
}
