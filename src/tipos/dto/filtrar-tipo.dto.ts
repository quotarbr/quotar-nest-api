import { IsOptional, IsString } from "class-validator";

export class FiltrarTipoDto {

    @IsOptional()
    @IsString()
    string?: string;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
}

