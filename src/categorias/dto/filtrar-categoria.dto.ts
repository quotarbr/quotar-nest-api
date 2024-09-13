import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FiltrarCategoriaDto {
    @IsString()
    @IsOptional()
    string?: string;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
}

