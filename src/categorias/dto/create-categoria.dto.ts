import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: 'O nome da categoria deve ser uma string válida.' })
    @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio.' })
    cat_nome: string;
}
