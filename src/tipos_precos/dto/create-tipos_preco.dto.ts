import { IsNotEmpty, IsString } from "class-validator";

export class CreateTiposPrecoDto {
    @IsString()
    @IsNotEmpty()
    tp_prec_nome: string;
}
