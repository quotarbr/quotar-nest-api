

import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrarOpcaoDto {

    @IsString({ message: 'O campo deve ser uma string válida.' })
    @IsOptional()
    string?: string;

    @IsArray({ message: 'O campo prodt_ids deve ser uma array válida'})
    @IsOptional()
    prodt_ids?: string[];

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
    
}
