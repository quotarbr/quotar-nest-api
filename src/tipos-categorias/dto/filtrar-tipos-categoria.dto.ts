import { IsOptional, IsString } from "class-validator";

export class FiltrarTiposCategoriaDto {
    @IsOptional()
    @IsString()
    tp_id?: string;

    @IsOptional()
    @IsString()
    cat_id?: string;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
}
