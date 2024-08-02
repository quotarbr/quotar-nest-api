import { IsNotEmpty, IsString } from "class-validator";

export class CategoriaDto {
    @IsString()
    @IsNotEmpty()
    cat_nome: string;
}
