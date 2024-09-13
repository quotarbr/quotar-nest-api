import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    cat_nome: string;
}
