import { Categoria } from "@prisma/client";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTipoDto {
    @IsString({ message: 'O nome do tipo deve ser uma string válida.' })
    @IsNotEmpty({ message: 'O nome do tipo não pode estar vazio.' })
    tp_nome: string;

    @IsArray({ message: 'As categorias devem ser fornecidas em formato de array.' })
    @IsNotEmpty({ message: 'É necessário fornecer pelo menos uma categoria.' })
    @IsNumber({}, { each: true, message: 'Cada valor de categoria deve ser um número.' })
    categorias: number[];

}
