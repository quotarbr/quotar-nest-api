

import { IsOptional, IsString } from "class-validator";

export class FiltrarOpcaoDto {

    @IsString({ message: 'O campo deve ser uma string válida.' })
    @IsOptional()
    string?: string;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
    
}
