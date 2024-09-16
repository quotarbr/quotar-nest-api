import { IsNotEmpty, IsString } from "class-validator";

export class CreateTiposCategoriaDto {
    @IsNotEmpty()
    @IsString()
    tp_id?: string;

    @IsNotEmpty()
    @IsString()
    cat_id?: string;
}
