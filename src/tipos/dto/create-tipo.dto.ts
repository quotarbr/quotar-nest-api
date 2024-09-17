import { Categoria } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTipoDto {
    @IsString()
    @IsNotEmpty()
    tp_nome: string;

    @IsNotEmpty()
    @IsNumber()
    categorias: number[];

}
