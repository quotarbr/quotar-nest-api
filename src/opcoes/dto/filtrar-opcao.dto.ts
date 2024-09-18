

import { IsOptional, IsString } from "class-validator";

export class FiltrarOpcaoDto {

    @IsString()
    @IsOptional()
    string?: string;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
    
}
